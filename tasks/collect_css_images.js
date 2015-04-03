/*
 * grunt-collect-css-images
 * https://github.com/vishwanath/collect-css-images
 *
 * Copyright (c) 2015 Vishwanath Arondekar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path    = require('path');
  var fs = require('fs');
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('collect_css_images', 'The best Grunt plugin ever.', function() {
    'use strict';

    var options = this.options({
      baseUrl : ''
    });


    var httpRegex = new RegExp('http[s]?', 'ig');
    var imageRegex = new RegExp('background-image[\\s*]:[\\s*][\\s]?url\\(["\']?([\\w\\d\\s!:./\\-\\_]*\\.[\\w?#]+)["\']?\\?*\w*.*\w*\\)[^;]*\;', 'ig');
    var filepathRegex = new RegExp('["\']?([\\w\\d\\s!:./\\-\\_]*\\.[\\w?#]+)["\']?', 'ig');

    var collectImages = function(files, dest) {
            var images = [];
            var found = false;

            files.forEach(function(srcFile) {
                var data = grunt.file.read(options.baseUrl + srcFile);

                console.log('data', data);

                var references = data.match(imageRegex);

                console.log('references : ', references)

                // If references are found
                if (references) {
                    references.forEach(function(file) {
                        // Exit if it contains a http/https
                        if (httpRegex.test(file)) {
                            grunt.verbose.warn(file + ' has been skipped as it\'s an external resource!');
                            return false;
                        }
    
                        // Exit if not a PNG
                        //if (!/\.png.*/.test(file)) {
                        //    grunt.verbose.warn(file + ' has been skipped as it\'s not a PNG!');
                        //    return false;
                        //}
                        
    
                        var filepath;
                        var imagePath = file.match(filepathRegex)[0].replace(/['"]/g, '');
    
                        console.log('imagePath : ', imagePath);

                        if(imagePath[0] === '/') {
                          filepath = options.baseUrl + imagePath;
                        } else {
                          filepath = path.resolve(srcFile.substring(0, srcFile.lastIndexOf("/")), imagePath);
                          console.log('In else : ', srcFile.substring(0, srcFile.lastIndexOf("/")));
                        }

                        console.log('filepath 1 : ', filepath);
                        
                        filepath = filepath.replace(/\?.*/, '');

                         console.log('filepath 2 : ', filepath);
                        
    
                        if (grunt.file.exists(filepath)) {
                            images[filepath] = {file : file, imagePath : imagePath};
                            found = true;
                            console.log('dest : ', dest);
                            var destPath = path.resolve(dest + "\\" + srcFile.substring(0, srcFile.lastIndexOf("/")) , imagePath);
                            console.log('destPath : ', destPath);
                            grunt.file.copy(filepath, destPath);
                        } else {
                            grunt.verbose.warn(filepath + ' has been skipped as it does not exist!');
                        }
                    });
                }
            });

            return found ? images : found;
        };

    console.log('this.files', JSON.stringify(this.files));

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      collectImages(f.src, f.dest);
    });




  });

};
