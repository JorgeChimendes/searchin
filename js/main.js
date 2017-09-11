var file, len;
var search = [];
var lines = [];
var target;

window.onload = function() {
    try {
        //  $('#searchScreen').fadeIn("fast");
        $('#lineNum0').text("0");
        $('#result0').text("Ready to search...");
        $('#voltar').fadeOut();
        $('#voltar').click(function() {
            $('#dragFile').fadeIn("fast");
            $('#dragFile').animate({ 'margin-top': '-=2000' }, 500, function() {});
            var myNode = document.getElementById("resultList");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            $('#showEntireFile').text('');
        });
        $('#voltar').click(function() {
            file = len = null;
            for (var i = 1; i < search.length; i++) {
                document.getElementById("line" + i).remove();
                document.getElementById("lineNum" + i).remove();
                document.getElementById("result" + i).remove();
            }
            for (; search.length > 0;) {
                search.pop();
            }
        });


        target = document.getElementById('dragFile');


        if (target) {
            target.addEventListener("dragover", function(event) {
                event.preventDefault();
            }, false);

            target.addEventListener("drop", function(event) {

                // cancel default actions
                event.preventDefault();

                var i = 0;
                file = event.dataTransfer.files[0];
                len = file.length;
                //split the file by line
                var reader = new FileReader();
                reader.onload = function() {
                    lines = reader.result.toString().split('\n');

                    for (; i < len; i++) {
                        console.log("Filename: " + file[i].name);
                        console.log("Type: " + file[i].type);
                        console.log("Size: " + file[i].size + " bytes");
                    }
                    $('#dragFile').animate({ 'margin-top': '+=2000px' }, 800, function() {});
                    $('#dragFile').fadeOut("fast");
                    $('#searchScreen').fadeIn("fast");

                    writeFile();
                };
                reader.readAsText(file);
            }, false);


        }

        var timeoutID = null;
        $('#expression').keyup(function() {
            searchString();
        });
    } catch (ex) {
        alert(ex.message);
    }


};




function writeFile() {
    try {
        var entire = document.getElementById('showEntireFile');


        for (var i = 0; i < lines.length; i++) {
            var p = document.createElement('p');
            p.setAttribute('id', 'entire' + (i + 1));
            p.setAttribute('style', 'margin-top: -18px;');
            $(p).text(i + 1 + ': ' + lines[i]);
            entire.appendChild(p);
        }

        $('#voltar').fadeIn();
    } catch (ex) {
        alert(ex.message);
    }
}

function searchString() {
    if ($('#expression').val() == '')
        return;
    for (; search.length > 0;) {
        search.pop();
    }
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].search($('#expression').val()) > -1) {
            var tempObj = {
                line: i + 1,
                result: lines[i]
            };
            search.push(tempObj);
        }
    }
    var myNode = document.getElementById("resultList");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    showOntheScreen();
}


function showOntheScreen() {
    try {
        //clear the marked lines 
        for (var i = 0; i < lines.length; i++) {
            document.getElementById('entire' + (i + 1)).setAttribute('style', 'background-color: transparent;');
        }

        var ul = document.getElementById('resultList');
        if (search.length < 1) {
            var li = document.createElement('li');
            li.setAttribute('id', 'void');
            li.setAttribute('class', 'mdl-list__item');
            var span = document.createElement('span');
            span.setAttribute('class', 'mdl-list__item-primary-content');
            ul.appendChild(li);
            li.appendChild(span);
            $('#void').text("Not found");
        }
        for (var i = 0; i < search.length; i++) {
            document.getElementById('entire' + search[i].line).setAttribute('style', 'background-color: #f8ecc7;');
            var li = document.createElement('li');
            li.setAttribute('id', 'f' + i);
            li.setAttribute('class', 'mdl-list__item');
            li.setAttribute("style", "box-shadow: 1px 1px 2px; width: 765px; height: 48px; margin-left: 10px; margin-top: 5px;");

            var span = document.createElement('span');
            span.setAttribute('class', 'mdl-list__item-primary-content');
            ul.appendChild(li);
            li.appendChild(span);

            var div1 = document.createElement('div');
            div1.setAttribute('style', 'width: 40px; height: 33px; left: 0; box-shadow: 1px 1px 1px; padding-top: 15px; text-align: center;');
            div1.setAttribute('id', 'line' + i);
            $(div1).text(search[i].line);
            span.appendChild(div1);

            var div2 = document.createElement('div');
            div2.setAttribute('style', 'margin-left: 5px;');
            div2.setAttribute('id', 'attribute' + i);
            $(div2).text(search[i].result);
            span.appendChild(div2);

        }
    } catch (ex) {
        alert(ex.message);
    }
}