# grunt-collect-css-images

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-collect-css-images --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-collect-css-images');
```

## The "collect_css_images" task

### Overview
In your project's Gruntfile, add a section named `collect_css_images` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  collect_css_images: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Examples

In this example, all css files in the current directory and subdirectories of level-1-dir directory will be parsed for the images and all those images will be copied into dest directory as they are in the original directory hierarchy.

```js
grunt.initConfig({
  collect_css_images: {
    custom_options: {
      files: {
        'dest': ['*.css', 'level-1-dir/**/*.css']
      }
    }
  }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
