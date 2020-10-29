const express = require('express')
const handlebars = require('express-handlebars')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const app = express()


app.engine('hbs', 
    handlebars({defaultLayout: 'default.hbs'})    
)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    const cart = []
    res.status(200)
    res.type('text/html')
    res.render('index', { cartState: JSON.stringify(cart)})
})


/*
app.post('/', 
    express.urlencoded({extended: true}),
    express.json(), 
    (req, res) => {
    console.log('body: ', req.body)
    //cart.push(req.body)
    

    const cart = JSON.parse(req.body.cartState)
    cart.push({
        item: req.body.item,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice
    })
    res.status(201)
    res.type('text/html')
    res.render('index', {
        cart: cart,
        cartState: JSON.stringify(cart)
        //item: req.body.item,
        //quantity: req.body.quantity,
        //unitPrice: req.body.unitPrice
    })
})
*/

app.post('/', 
    express.urlencoded({ extended: true }),
    (req, resp) => {
        console.info('body: ', req.body)
        const cart = JSON.parse(req.body.cartState)
        cart.push({
            item: req.body.item,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        })
        resp.status(200)
        resp.type('text/html')
        resp.render('index', { 
            cart: cart,
            cartState: JSON.stringify(cart)
        })
    }
)

// item, quantity, unitPrice




app.use(express.static(__dirname + '/static'))

app.listen(PORT, () => {
    console.log(`Application started on port: ${PORT} at ${new Date()}.`)
})