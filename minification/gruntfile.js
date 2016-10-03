module.exports = function (grunt) {  
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);  
    // Project configuration.  
    grunt.initConfig({  
        pkg: grunt.file.readJSON('package.json'),  
        uglify: {  
            options: {  
                compress: true  
            }, 
            my_target: {
  '../New_mongo/**/*.js'             files: [{
                  expand: true,
                  cwd: '../New_mongo',
                  src: ['../New_mongo/*.js', '../New_mongo/**/*.js'],
                  dest: 'js'
              }]
            }  
        }  
    });  
    // Default task.  
    grunt.registerTask('default', ['uglify']);  
};