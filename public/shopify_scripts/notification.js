var loadScript = function (url, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";

    // If the browser is Internet Explorer.
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
        // For any other browser.
    } else {
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

};

if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 3.6)) {
    loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function () {
        window.jQuery36 = jQuery;
        jQuery36("document").ready(function () {
            fetch(`/apps/saadat-polaris-app/shopify_proxy/notifications`).then(data => data.json())
                .then(data => {
                    const notification = data.notification;
                    $('body').prepend(`<div class="notification-bar" style="text-align:center;color:${notification.color};background: ${notification.background_color};">${notification.title}</div>`);
                })
        })

    });
}