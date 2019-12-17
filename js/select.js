/// Get Url 
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;  // return function 
};

var member;
$(document).ready(function(){
    repuestApi();
    /// click select one recipe 
    $("#select").on('change',function(){
        var recipeID = $("#select").val();
        getRecipe(recipeID)
        $("#show_hide").show();
        $("#line").show();
    });
    $("#show_hide").hide();
    $("#line").hide();

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
};

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
    allData.forEach(item => {
      if( item.id == id){
          eachRecipe (item.name , item.iconUrl , item.nbGuests); // call from eachRecipe
          eachIngrediant (item.ingredients); ///  call from eachIngrediant 
          eachStep (item.instructions); /// call from eachStep function 
      }
    })
}

//// Dispaly Recipe to html 
function  eachRecipe( name , img , guest ){
    var results = "";
    var nbGuest = "";
    nbGuest +=`<input type="text" id="num" disabled class="form-control text-center" value="${guest}">`;
    $("#nbGuest").html(nbGuest);
    results +=` <h3>${name}</h3>`;
    $("#out").html(results);
    var result = "";
    result +=`<img src="${img}" width="100" height="100">`;
    $("#outs").html(result);
}

/// get Ingrediant and display to html 
function eachIngrediant (ingrediant){
    $("#result_recipe").html("Ingrediants");
    var results = "";
    ingrediant.forEach(element => {
        results +=`
            <tr>
                <td> <img src="${element.iconUrl}" width="40"></td>
                <td>${element.quantity}</td>
                <td>${element.unit[0].toLowerCase()}</td>
                <td>${element.name}</td>
            </tr>
        `;
    });
    $("#result").html(results);
}

//// Loop to get all step of instruction and display it to html 
function eachStep(instructions) {
    $("#result_intruction").html("Instructions");
    var splitStep = instructions.split("<step>");
    var instruction = "";
    for( let i = 1 ; i< splitStep.length ; i++){
        instruction +=`
            <p class="text-success"> <strong>Step:${i}</strong></p>
            <p> ${splitStep[i]}</p>
        `;
    };
    $("#instructions").html(instruction);
};


///// countter when we click on button it will increas the number 
var addNum = (num) => {
    var add = parseInt(num) + 1;
    member = addNum;
    if( add <= 15){
        $("#num").val(add);
        var result = add * 5;
        $("#out_num").html(result);
      
    };
};

//// Decreas Number when we click on button it will decreas the number 
var minusNum = (num) => {
    var minus = parseInt(num ) -1;
    member = addNum;
    if( minus >= 0){
        $("#num").val(minus);
        var results = minus * 5;
        $('#out_num').html(results)
    };
};

/// function to add number
function compute(member) {
    return  parseInt(member);
}

