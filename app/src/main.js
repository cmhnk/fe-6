import './styles/base.scss';

import $ from 'jquery';
$(document).ready(function() {
  var $form = $('.nag-form');
  console.log('hello');

  $form.submit( function(event){
    // alert("Thank you for submitting your response! The robots are working...");
    event.preventDefault();
    console.log('yo!');
    var data = {};
    $(".nag").each(function() {
      data[$(this).attr("name")] = Number($(this).val());
    });
    data["firstname"] = $(".nag-string").val();

    var more = {"data": data};
    console.log(more);

    $.ajax({
      method: 'POST',
      url: '/anything-at-all',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      // contentType: "application/json; charset=utf-8",
      // dataType: "json",
      success: function(resp) {
        $( ".four " ).text(resp.resp.data.content);
        console.log(resp);
      }
    })

    // wordsmith.projects.find('nag-simulator')
    //   .then(function(project) {
    //     return project.templates.find('nagging-parent');
    //   })
    //   .then(function(template) {
    //     return template.generate(data);
    //   })
    //   .then(function(content) {
    //     $( ".four " ).text(content)
    //   })
  });
});
