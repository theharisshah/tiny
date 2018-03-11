var Template = function($template) {
    var $clone = null;
    this.setData = function(data) {
        var match;
        var regex = /{#\s*(\S+)\s*#}/;
        $clone = $template.clone();
        $clone.html(function(i, html) {
            while (match = regex.exec(html)) {
                var value = data[match[1]];
                html = html.replace(match[0], value == undefined ? "" : value);
                match = regex.exec(html);
            }
            return html;
        });
        $clone.find('select').each(function(index) {
            var value = $(this).data('value');
            if (value != undefined) {
                $(this).val(value);
            }
        });
        $clone.find('.mobile-country-picker').intlTelInput({
            autoPlaceholder: false,
            initialCountry: 'IN'
        });
    };
    this.appendTo = function($container) {
        $container.append($clone);
    };
    this.replaceIn = function($container) {
        $container.html('');
        this.appendTo($container);
    };
    this.getJqueryObject = function() {
        return $clone;
    }
};
