class MyRecipe extends React.Component {
    constructor(props) {
super(props);
this.state = {recipe: {},
title: "",
isSelected: false,
isVegetarian: false,
numberOfCals: 0,
prep: "",
ingredients: "",
_id: "",
updateIsVegetarian: false,
updateNumberOfCals: 0,
updatePrep: "",
updateIngredients: ""
}

this.getRecipe = this.getRecipe.bind(this);
this.onChange = this.onChange.bind(this);
this.handleInputChange = this.handleInputChange.bind(this);
this.updateHandleInputChange = this.updateHandleInputChange.bind(this);
this.clear = this.clear.bind(this);
}

onChange = (e) => this.setState({ [e.target.name]: e.target.value });
clear = () => {this.setState({title: ""})}

getRecipe = () => {fetch(`/api/recipe/${this.state.title}`).then((data) => {
                return data.json();
            }).then( json => {
                this.setState({
                    recipe: json,
                    isSelected: true
                });
                console.log(json);
            });}
delete = () => {axios.delete(`/api/recipe/${this.state.recipe._id}`).then((response) => {
console.log(response);})
this.setState({isSelected: false})}
post = () => {axios.post(`/api/recipe`,{_id: this.state._id, preparation: this.state.prep, ingredients: [this.state.ingredients], calories: this.state.numberOfCals, vegetarian: this.state.isVegetarian}).then((response) => {
console.log(response)
this.setState({     
                    _id: "",
                    isVegetarian: false,
                    numberOfCals: 0,
                    prep: "",
                    ingredients: ""
                    });}
)}
update = () => {axios.put(`/api/recipe/${this.state.recipe._id}`,{preparation: this.state.updatePrep, calories: this.state.updateNumberOfCals, vegetarian: this.state.updateIsVegetarian, ingredients: [this.state.updateIngredients]}).then((response) => {
console.log(response)
this.setState({     isSelected: false,
                    updateIsVegetarian: false,
                    updateNumberOfCals: 0,
                    updatePrep: "",
                    updateIngredients: ""
                    });
                  })}
                    

handleInputChange(event) {
const target = event.target;
const value = target.name === 'isVegetarian' ? target.checked : target.value;
const name = target.name;

this.setState({
  [name]: value
}); 


}
updateHandleInputChange(event) {
const target = event.target;
const value = target.name === 'updateIsVegetarian' ? target.checked : target.value;
const name = target.name;

this.setState({
  [name]: value
}); 


}
        
    render() {
        
      return(
           <div>
           <h1>My Recipes</h1>             
      <input className="getRecipe" type="text"  name="title" placeholder="Choose Recipe" value={this.state.title} onChange={this.onChange}/><button className="clear" onClick={this.clear}>x</button><button onClick={this.getRecipe}>Get recipe</button>             
            <div className="addRecipe">
            <h2>Add new recipe to the database</h2>
                <form>
                  <label>
      Name
      <input
        name="_id"
        placeholder="Enter Name of Your Recipe"
        type="text"
        value={this.state._id}
        onChange={this.handleInputChange} />
    </label>
    <label>
      Number of Calories
      <input
        name="numberOfCals"
        type="number"
        value={this.state.numberOfCals}
        onChange={this.handleInputChange} />
    </label>
    <label>
      Preparation
      <input
        name="prep"
        placeholder="Enter Instructions"
        type="text"
        value={this.state.prep}
        onChange={this.handleInputChange} />
    </label>
    <label>
      Ingredients:
      <input
        name="ingredients"
        placeholder="Enter name of your Ingredients"
        type="text"
        value={this.state.ingredients}
        onChange={this.handleInputChange} />
    </label>
    <label>
      Vegetarian:
      <input
        name="isVegetarian"
        type="checkbox"
        checked={this.state.isVegetarian}
        onChange={this.handleInputChange} />
    </label>
    
  </form><button onClick={this.post}>ADD</button>
  </div>
  <div className={`${this.state.isSelected?"selectedRecipe":"notSelected"}`}>
  <h2>Your Recipe</h2>
             <div className={`veg${this.state.recipe.vegetarian?"":"nonveg"}`}>
                <p> Name of Recipe: {this.state.recipe._id}</p>
               <p> Ingredients: {this.state.recipe.ingredients}</p>
              <p>  Number of Calories: {this.state.recipe.calories}</p>
              <p>  How to prepare: {this.state.recipe.preparation}</p>   
           </div>
              <button onClick={this.delete}>DELETE</button>     <form> 
    <label>
      Number of Calories
      <input
        name="updateNumberOfCals"
        type="number"
        value={this.state.updateNumberOfCals}
        onChange={this.updateHandleInputChange} />
    </label>
    <label>
      Ingredients:
      <input
        name="updateIngredients"
        type="text"
        placeholder="Update Ingredients"
        value={this.state.updateIngredients}
        onChange={this.updateHandleInputChange} />
    </label>
    <label>
      Preparation
      <input
        name="updatePrep"
        type="text"
        placeholder="Update your Instructions"
        value={this.state.updatePrep}
        onChange={this.updateHandleInputChange} />
    </label>
    <label>
      Vegetarian:
      <input
        name="updateIsVegetarian"
        type="checkbox"
        checked={this.state.updateIsVegetarian}
        onChange={this.updateHandleInputChange} />
    </label>
  </form><button onClick={this.update}>UPDATE</button>
  
            </div>
            </div>
      )
    }
  }

  ReactDOM.render(<MyRecipe />, document.getElementById('mydiv'))