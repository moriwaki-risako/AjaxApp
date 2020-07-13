class PostsController < ApplicationController
  
  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end

  def new
    @post = Post.new
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
    
    # 旧カリキュラム
    # Post.create(post_params)  # Post.create()の()には、実際にテーブルに登録したいデータを記載
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
