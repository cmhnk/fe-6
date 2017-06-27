import './styles/base.scss';

import $ from 'jquery';
$(document).ready(function() {
  var $form = $('.nag-form');
  console.log('hello');

  $form.submit( function(event){
    alert("Thank you for submitting your response! The robots are working...");
    event.preventDefault();
    console.log('yo!');
    var data = {};
    $(".nag").each(function() {
      data[$(this).attr("name")] = Number($(this).val());
    });
    data["firstname"] = $(".nag-string").val();

    console.log(data);

    var wordsmith = require('wordsmith-node-sdk')('process.env.WORDSMITH_KEY', 'Corinne');
    console.log(wordsmith);

    wordsmith.projects.find('nag-simulator')
      .then(function(project) {
        return project.templates.find('nagging-parent');
      })
      .then(function(template) {
        return template.generate(data);
      })
      .then(function(content) {
        $( ".four " ).text(content)
      })
  });
});
