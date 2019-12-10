/// Get Url 
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
};
$(document).ready(function(){
    repuestApi();
    $("#select").on('change',function(){
        var recipeID = $("#select").val();
        getRecipe(recipeID)
    });
});
//// Reques API 
function repuestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    });
}
//// get name to select option 
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option +=`<option value ="${element.id}">${element.name}</option>`;
    });
    $("#select").append(option);
}

//// get ID of each elements
function getRecipe (id){
    console.log(id);
    allData.forEach(item => {
      if( item.id == id){
          eachRecipe (item.name , item.iconUrl,);
          eachIngrediant (item.ingredients);
          eachStep (item.instructions);
      }
    })
}
//// Dispaly Recipe to html 
function  eachRecipe( name , img ){
    var results = "";
    results +=` <h3>${name}</h3>`;
    $("#out").html(results);
    var result = "";
    result +=`<img src="${img}" width="100">`;
    $("#outs").html(result);
}

/// get Ingrediant 
function eachIngrediant (ingrediant){
    var results = "";
    ingrediant.forEach(element => {
        // console.log(element)
        results +=`
            <tr>
                <td> <img src="${element.iconUrl}" width="40"></td>
                <td>${element.name}</td>
                <td>${element.unit[0].toLowerCase()}</td>
                <td>${element.quantity}</td>
            </tr>
        `;
    });
    $("#result").html(results);
}
//// Loop get all step of instruction 

function eachStep(instructions) {
    console.log(instructions);
    var instruction = "";
        instruction +=`
            ${instructions}
        `;
    $("#instructions").html(instruction);
}
// //// get all data
// function getRecipes(datas) {
//     allData.datas.forEach( recs => {
//         // your recipe can get here example: recs.name
//         getIngrediant(recs); // get all ingrediant
//     });
// }

// //// get all ingrediant [name function]
// function getIngrediant(recipe) {
//     recipe.allData.ingredients.forEach(ing => {
//             showIngrediantTable(ing);
//     })
// }
// // display ingrediant in table [arrow function]
// var showIngrediantTable = (show) => {
//     var ingrediant = "";
//         ingrediant += `
//             <tr>
//                 <td><img src="${show.iconUrl}" width="25" class="img-fluid"></td>
//                 <td>${show.quantity}</td>
//                 <td>${show.unit[0]}</td>
//                 <td>${show.name}</td>
//             </tr>
//         `;
//         $('#result').append(ingrediant);
// }
