const express= require("express");

const app = express();

const PORT = 8000;

//in Memory DB
const books = [
    {id:1, title:'Book One', author:'Auther One'},
    {id:2, title:'Book Two', author:'Author two'}
];

//Middleware(Plugins);

app.use(express.json());

// Routes
app.get('/books', (req,res) =>{
    res.setHeader('x-man', 'Aman Maurya')
    res.json(books);
})
app.get('/books/:id', (req,res)=>{
    console.log(req.params);

    const id = parseInt(req.params.id);
    if(isNaN(id))
        return res.status(400).json({error:`id must be of type number`})
    const book =  books.find((e) => e.id === id);

    if(!book){
        return res.status(404).json({error : `Book with id ${id} does not exist`});
        
    }
    return res.json(book);
})

app.post('/books', (req,res)=>{
    const {title, author} = req.body;

    if(!title  || title === " ")
        return res.status(400).json({error:'title is required'})
    if(!author  || author === " ")
        return res.status(400).json({error:'author is required'})

    const id = books.length+1;

    const book =  {id, title, author};
    books.push(book);
    return res.status(201).json({message: 'Book created success', id});
});

app.delete('/books/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id))
        return res.status(400).json({error:`id must be of type number`})
    const IndexToDelete =  books.findIndex((e) => e.id === id);
    console.log(IndexToDelete);
    if(IndexToDelete < 0){
        return res.status(404).json({error:`Book with id ${id} does not exist`});
        
    }
    books.splice(IndexToDelete, 1);

    return res.status(200).json({message:'Books deleted'})
})

app.listen(PORT, () =>console.log(`HTTP server is running on PORT ${PORT}`));
