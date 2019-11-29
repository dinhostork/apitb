const express = require("express");
const router = express.Router();
const Books = require("../models/book");
const User = require("../models/user22");
const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);

//controlador de livros, adicionar, remover...
//adcionar um novo livro
router.post("/add", async (req, res) => {
  const { name, pages } = req.body; //pegando informações do corpo da requisição
  try {
    //tratando erros
    const book = await Books.create({ name, pages }); //criando um novo livro no banco de dados
    res.send(book); //tudo ocorreu bem
  } catch (e) {
    res.status(400).send({ error: "falha ao adicionar livro" + e }); //ocorreu algum erro
  }
});

//listando todos os livros
router.get("/list", async (req, res) => {
  const books = await Books.find(); //encontrando todos
  res.send(books);
});

//listando apenas um
router.get("/list/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: "falta id" });
  try {
    const book = await Books.findById(id);
    return res.send(book);
  } catch (e) {
    return res
      .status(400)
      .send({ error: "Não foi possível encontrar o livro" });
  }
});

//informar o que esta lendo e em qual porcentagem
router.post("/read/:id", async (req, res) => {
  const { id } = req.params;
  const { page } = req.body;
  if (!id || !page)
    return res.status(400).send({ error: "informações faltando" });

  try {
    const book = await Books.findById(id);
    const percentage = Math.round((page * 100) / book.pages);
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        readingBook: book,
        percentage
      },
      { new: true }
    );

    return res.send(user);
  } catch (e) {
    return res
      .status(400)
      .send({ error: "Não foi possível encontrar o livro" });
  }
});

//listando usuários na mesma posição que você
router.get("/reading/", async (req, res) => {
  const listButYou = (yourId, all) => {
    const temparray = [];
    console.log(all);

    all.map(item => {
      if (item.id !== yourId) {
        temparray.push(item);
      }
    });
    return temparray;
  };
  try {
    const user = await User.findById(req.userId).select("+percentage");
    const readingBook = user.readingBook;
    const percentage = user.percentage;
    let readers = await User.find({
      readingBook,

    });
    readers = listButYou(req.userId, readers);

    if (readers.length === 0) {
      for (let i = percentage; i < percentage + 10; i++) {
        let tmpReaders = await User.find({
          readingBook,
          percentage: i
        });
        readers.push(tmpReaders)
      }
      
    }

    readers = listButYou(req.userId, readers);

    if (readers.length === 0) {
        for (let i = percentage; i < percentage - 10; i--) {
          let tmpReaders = await User.find({
            readingBook,
            percentage: i
          });
          readers.push(tmpReaders)
        }
        
      }
    return res.send(readers);
  } catch (e) {
    return res
      .status(400)
      .send({ error: "nenhum outro leitor encontrado" + e });
  }
});

//atualiza porcentagem
router.post("/percentage/", async (req, res) => {
  const { page } = req.body;
  if (!page) return res.status(400).send({ error: "informações faltando" });

  try {
    const tmpUser = await User.findById(req.userId);
    const book = tmpUser.readingBook;
    const percentage = Math.round((page * 100) / book.pages);
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        percentage
      },
      { new: true }
    );

    return res.send(user);
  } catch (e) {
    return res.status(400).send({ error: "Falha ao atualizar informações" });
  }
});

module.exports = app => app.use("/books", router);
