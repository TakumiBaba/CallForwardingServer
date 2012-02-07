require "rubygems"
require "sinatra"


get "/" do 
  "hoge"
end

post "/" do
  params[:hoge]
end
