require "rubygems"
require 'html-proofer'

desc "Deploy to Github Pages"
task :deploy do
  ruby 'scripts/deploy.rb'
end

desc "Test the generated html"
task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site").run
end
