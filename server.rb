require "rubygems"
require "sinatra"


get "/:param" do 
  params[:param]
end

post "/" do
  params[:hoge]
end
