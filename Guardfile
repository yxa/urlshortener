# A sample Guardfile
# More info at https://github.com/guard/guard#readme


guard 'process', :name => 'NPM', :command => 'npm install' do
  watch %r{package.json}
end

guard 'livereload' do
  watch(%r{app/views/.+\.(erb|haml|slim)})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  
  watch(%r{views/.+\.(jade)})
  watch(%r{public/javascripts/.+\.js})
  watch(%r{public/stylesheets/.+\.css})
  # Rails Assets Pipeline
  watch(%r{(app|vendor)/assets/\w+/(.+\.(css|js|html)).*})  { |m| "/assets/#{m[2]}" }
end


# JavaScript only watchers
guard "jasmine-node", :jasmine_node_bin => File.expand_path(File.dirname(__FILE__) + "/node_modules/jasmine-node/bin/jasmine-node")  do
   watch(%r{public/jasmine/spec/.+\.spec\.js$})
   watch(%r{^lib/(.+)\.js$})     { |m| "spec/lib/#{m[1]}_spec.js" }
   watch('spec/spec_helper.js')
end
