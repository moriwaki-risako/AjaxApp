class PostsController < ApplicationController
  
  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end

  def new
    @post = Post.new
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    # メモ作成時に未読の情報を保存する
    render json:{ post: post }
    
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
      # 既読を解除するためにfalseへ変更
    else
      post.update(checked: true)
      # 既読にするためtrueへ変更
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
