require "rubygems"
require "sinatra"


get "/:id/:state" do 
  if(params[:state] ==0){
    "着信なうだよー"
  }else if(params[:state] == 1){
    "電話がきれたよー"
  }else if(params[:state] == 2){
    "電話をとったよー"
  }
end

post "/" do
  params[:hoge]
end
