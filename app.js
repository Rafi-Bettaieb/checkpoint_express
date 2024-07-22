const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./person');

const uri = process.env.MONGO_URI;

//Create and Save a Record of a Model using model.save() :
async function addPerson() {
  try {
    const newPerson = new Person({
      name: 'mohammed',
      age: 125,
      favoriteFoods: ['candy', 'cheese']
    });
    await newPerson.save();
    console.log('Person saved successfully:', newPerson);
  }
  catch (err) {
    console.log("eeror occured when adding one person");
  }
}
//Create Many Records using model.create()
async function addPersons() {
  try {
    const arrayOfPeople = [
      { name: 'raslen', age: 1, favoriteFoods: ["sandwich", "steak"] },
      { name: 'mohammed', age: 13, favoriteFoods: ["fish", "rice"] },
      { name: 'Ahmed', age: 20, favoriteFoods: ["salad", "pie"] },
      { name: 'yassine', age: 61, favoriteFoods: ["cookie", "cake"] }
    ]
    await Person.create(arrayOfPeople);
    console.log('People created successfully:', arrayOfPeople);
  }
  catch {
    console.log("error occured when adding multiple persons");
  }
}
//Use model.find() to Search Your Database
async function findByName() {
  try {
    const people = await Person.find({ name: "mohammed" });
    const cnt = await Person.countDocuments({ name: "mohammed" });
    console.log("People found successfully");
    console.log(cnt, "people with name :", people);
  }
  catch {
    console.log("error when finding people with specific name");
  }
}

//Use model.findOne() to Return a Single Matching Document from Your Database
async function findByFood() {
  try {
    const personByFood = await Person.findOne({ favoriteFoods: "cake" });
    console.log("the person with the favorite food of cake is", personByFood);
  }
  catch {
    console.log("error occured when finding one person with a favorite food");
  }
}
//Use model.findById() to Search Your Database By _id
async function findPersonById() {
  try {
    const personById = await Person.findById("669d85202e55461a87dac0c9");
    if (personById) {
      console.log('Person found successfully:', personById);
    } else {
      console.log('Person not found');
    }
  } catch (err) {
    console.error("error occured when finding person by id");
  }
}

//Perform Classic Updates by Running Find, Edit, then Save
async function updateFood() {
  try {
    const food = await Person.findById("669d85202e55461a87dbc0cc");
    food.favoriteFoods.push("hamburger");
    const updatedPerson = await food.save();
    console.log("person updated successfully");
  }
  catch {
    console.log("error occured when updating the person");
  }
}

//Perform New Updates on a Document Using model.findOneAndUpdate()
async function updateAge() {
  try {
    const updatedPerson = await Person.findOneAndUpdate({ name: "yassine" }, { age: 20 }, { new: true });
    console.log("person updated successfully");

  } catch {
    console.log("error occured when updating the persons age");
  }
}
//Delete One Document Using model.findByIdAndRemove
async function deletePersonById() {
  try {
    const removedPerson = await Person.findByIdAndDelete("669d2415e34dd7d5a7720580");
    if (removedPerson) {
      console.log('Person deleted successfully:', removedPerson);
    } else {
      console.log('Person not found for deletion');
    }
  } catch (err) {
    console.error("Error occured when deleting a person");
  }
}
//MongoDB and Mongoose - Delete Many Documents with model.remove()
async function deletePeople() {
  try {
    const cnt = await Person.countDocuments({ name: "mohammed" });
    const removePeople = await Person.deleteMany({ name: "mohammed" });
    console.log(cnt, "people with the name mohammed were deleted successfully", removePeople);
  }
  catch {
    console.log("error occured when deleting people with the name mohammed");
  }
}
//Chain Search Query Helpers to Narrow Search Results
async function chain() {
  try {
    const data = await Person.find({ favoriteFoods: "pasta" })
      .limit(2)
      .sort({ age: 1 })
      .select({ age: 0 })
      .exec()
    console.log("people after chaining are:",data)
  }
  catch {
    console.log("error occured when chaining")
  }


}

mongoose.connect(uri, {})
  .then(async () => {
    console.log('MongoDB connected successfully');

    // adding a person
    await addPerson();
    // adding multiple persons
    await addPersons();
    await findByName();
    await findByFood();
    await findPersonById();
    await updateFood()
    await updateAge();
    await deletePersonById();
    await deletePeople();
    await chain();
  })
  .catch(err => console.error('MongoDB connection error:', err))
  .finally(() => {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  })
