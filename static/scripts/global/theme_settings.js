/*
    if no light, then dark
*/
let light = true

let load_light_settings = function ()
{
    let temp = JSON.parse(localStorage.getItem('light'))
    if (temp === undefined || temp === null) light = true // by default
    else light = temp
    return temp
}

let save_light_settings = function ()
{
    localStorage.setItem('light', JSON.stringify(light))
}

let turn_lights_on = function ()
{
    document.getElementById("css_main").setAttribute('href', '/static/styles/main.css');
    light = true
}

let turn_lights_off = function ()
{
    document.getElementById("css_main").setAttribute('href', '/static/styles/dark-main.css');
    light = false
}

let toggle_lights = function ()
{
    if (light) turn_lights_off()
    else turn_lights_on()
}

let apply_light_settings = function ()
{
    if (light) turn_lights_on()
    else turn_lights_off()
}

$(document).ready(function() {
    load_light_settings()
    apply_light_settings()

    if(!light) {
        document.getElementById("myonoffswitch").checked = true
    }
    //else $('#light-switch').attr
})