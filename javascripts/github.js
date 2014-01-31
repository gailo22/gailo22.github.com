var github = (function(){
<<<<<<< HEAD
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
=======
>>>>>>> d81d5684945a1c284cbcf8f9f74a8ce5a00eb345
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
<<<<<<< HEAD
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+escapeHtml(repos[i].description||'')+'</p></li>';
=======
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+(repos[i].description||'')+'</p></li>';
>>>>>>> d81d5684945a1c284cbcf8f9f74a8ce5a00eb345
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      $.ajax({
<<<<<<< HEAD
          url: "https://api.github.com/users/"+options.user+"/repos?sort=pushed&callback=?"
        , dataType: 'jsonp'
=======
          url: "https://api.github.com/users/"+options.user+"/repos?callback=?"
        , type: 'jsonp'
>>>>>>> d81d5684945a1c284cbcf8f9f74a8ce5a00eb345
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          var repos = [];
          if (!data || !data.data) { return; }
          for (var i = 0; i < data.data.length; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
<<<<<<< HEAD
=======
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

>>>>>>> d81d5684945a1c284cbcf8f9f74a8ce5a00eb345
          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }
      });
    }
  };
})();
