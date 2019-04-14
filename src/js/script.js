$(function(){

    $(".start").on("click",function(event){
        $(this).parents(".section").addClass("active")
        return false
    })
    $(".reset").on("click",function(event){
        $(this).parents(".section").removeClass("active")
        return false
    })

})