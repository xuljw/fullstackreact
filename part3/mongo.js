const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please provide a password')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://airfnbadmin:${password}@serverlessinstance0.9ifbhcf.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0`
console.log(url)
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  }) 
  
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}






