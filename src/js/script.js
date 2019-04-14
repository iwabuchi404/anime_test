const PARAMS = {
    speed: 1,
  };


$(function(){
    const pane = new Tweakpane();
    pane.addInput(PARAMS, 'speed', {
        step: 0.05,
        min: 0,
        max: 100,
    });
    
    $(".start").on("click",function(event){
        $(this).parents(".section").find(".img-box").css("transition","all "+PARAMS.speed+"s")
        $(this).parents(".section").addClass("active")
        console.log(PARAMS.speed)
        
        return false
    })
    $(".reset").on("click",function(event){
        $(this).parents(".section").removeClass("active")
        return false
    })

})