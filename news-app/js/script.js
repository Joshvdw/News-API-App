$(document).ready(function(){

    $('.result-container').hide();

    $("#search-box").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#search-btn").click();
        }
    });

    $('#search-btn').click(function() {
        $('.result-container').show();
        $.ajax({
            url: 'https://newsapi.org/v2/everything?q=' + $('#search-box').val() + '&from=2021-02-28&sortBy=publishedAt&apiKey=2029fee289eb4531afade1a8c84ebb7c',
            type: "GET",
            
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', '2029fee289eb4531afade1a8c84ebb7c');
            },
            dataType: "json",
            success: function (result, status, xhr) {
                console.log(result);
                document.querySelector('#results').innerHTML = "";

                for (let i = 0 ; i < result.articles.length ; i++) {
                    document.querySelector('#results').innerHTML += ('<a href="' + result.articles[i].url + '" target="_blank" class="text-decoration-none"><div class="col-12 col-xl-6"><div class="col-12 w-100 p-0"><img class="w-100" src="' + 
                    result.articles[i].urlToImage + '" alt=""></div><br><div class="col-12 p-3 text-light text-decoration-none"><h3 class="pb-3">' + result.articles[i].title + '</h3><p>' + result.articles[i].description + 
                    '</p><br><div class="row"><div class="col-6 float-left"><p>' + result.articles[i].source.name + '</p></div><div class="col-6 float-right text-right"><p>' + result.articles[i].publishedAt + '</div></div></div></a><br><hr><br>')
                }
            },
            error: function (xhr, status, error) {
            }
        });
    });

    $('#refine-btn').click(function(){
        $('.result-container').show();
        let checkedResult = [];
        $('input[name="filter"]:checked').each(function () {
            let checked = this.value;
            checkedResult.push(checked);
        });

        checkedResult = String(checkedResult);

        console.log(checkedResult)
        $.ajax({
            url: 'https://newsapi.org/v2/everything?q=' + $('#search-box').val() + '&from=2021-02-28&sortBy=' + checkedResult + '&apiKey=2029fee289eb4531afade1a8c84ebb7c',
            type: "GET",

            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', '2029fee289eb4531afade1a8c84ebb7c');
            },
            dataType: "json",
            success: function (result, status, xhr) {
                document.querySelector('#results').innerHTML = "";

                for (let i = 0; i < result.articles.length; i++) {
                    document.querySelector('#results').innerHTML += ('<a href="' + result.articles[i].url + '" target="_blank" class="text-decoration-none"><div class="col-12 col-xl-6"><div class="col-12 w-100 p-0"><img class="w-100" src="' + 
                    result.articles[i].urlToImage + '" alt=""></div><br><div class="col-12 p-3 text-light text-decoration-none"><h3 class="pb-3">' + result.articles[i].title + '</h3><p>' + result.articles[i].description + 
                    '</p><br><div class="row"><div class="col-6 float-left"><p>' + result.articles[i].source.name + '</p></div><div class="col-6 float-right text-right"><p>' + result.articles[i].publishedAt + '</div></div></div></a><br><hr><br>')
                }
            },
            error: function (xhr, status, error) {
            }
        });
    });
});
