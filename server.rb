require "rubygems"
require "sinatra"


get "/:id/:state" do 
  params[:id] + params[:state]
end

post "/" do
  params[:hoge]
end
