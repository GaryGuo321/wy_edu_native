# 使用require引入模块
# 设置每次import引入只能用一次，重复忽略
# 若想多次引入同一个使用：@import "xxx!"
require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "image"
javascripts_dir = "js"
fonts_dir = "fonts"


# 输出css的格式
# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# 使用绝对路径(false)还是相对路径(true)
# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# 是否显示调试注释信息(false不显示)
# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# 设置开发模式
# environment = :production/:development

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
