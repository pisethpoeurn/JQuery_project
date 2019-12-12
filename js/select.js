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
     /// click add and get value from input 
     $("#add").on('click',function(){
        var input = $("#num").val();
        addNum(input);
    })
    //// click minus and get value from input 
    $('#minus').on('click',function(){
        var input = $("#num").val();
        minusNum(input);
    })
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
    $("#result_recipe").html("Ingrediant");
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
    $("#result_intruction").html("Intruction");
    var splitStep = instructions.split("<step>");
    var instruction = "";
    for( let i = 1 ; i< splitStep.length ; i++){
            instruction +=`
                <p class="text-success"> <strong>step${i}</strong></p>
                <p> ${splitStep[i]}</p>
            `;
        }
        $("#instructions").html(instruction);
}

///// countter 
////increas Number 
var addNum = (num) => {
    var add = parseInt( num) + 1;
    if( add <= 15){
        $("#num").val(add);
        var result = add * 5;
        $("#out_num").html(result);
      
    }
};
//// Decreas Number 
var minusNum = (num) => {
    var minus = parseInt(num ) -1;
    if( minus >= 0){
        $("#num").val(minus);
        var results = minus * 5;
        $('#out_num').html(results)
    }
}
