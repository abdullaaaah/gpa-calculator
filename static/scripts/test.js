let light = true
function change_site_mode(){
    if (light===true) {
        $("#mode_button").text("Dark Mode")
        $("#mode_button").removeClass("btn-light")
        $("#mode_button").addClass("btn-dark")
        document.getElementById("css_main").setAttribute('href', 'static/styles/dark-main.css');
        light = false
    }
    else{
        $("#mode_button").text("Light Mode")
        $("#mode_button").removeClass("btn-dark")
        $("#mode_button").addClass("btn-light")
        document.getElementById("css_main").setAttribute('href', 'static/styles/main.css');
        light = true
    }
}