class PostsController < ApplicationController
  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false) #投稿時に、checkedカラムにfalse(未読)を追加して保存
    render json:{ post: post } #json:{post :post}としてレスポンスを返す
  end

  def checked
    post = Post.find(params[:id])
    if post.checked #checkedカラムはboolean型なので、ここでtrueかfalseかを確認している
      post.update(checked: false) #true(既読)ならfalse(未読)へ
    else
      post.update(checked: true) #trueでないなら、trueへ変更
    end

    item = Post.find(params[:id]) #更新したレコードを再度取得してitemへ代入
    render json: { post: item } # itemをjson形式でchecked.jsに返却
  end

end
