require "rubygems"
require "sinatra"


get "/:id/:state" do 
  if(params[:state] ==0){
    "着信なうだよー"
  }elsif(params[:state] == 1){
    "電話がきれたよー"
  }elsif(params[:state] == 2){
    "電話をとったよー"
  }
end

post "/" do
  params[:hoge]
end
