class Api::Admin::CategoriesController < ApplicationController
  def index
    @categories = Category.all
    
    render :json => {
      categories: @categories
    }
  end

  def destroy
    @category = Category.find params[:id]
    @category.destroy
  end

  def create
    @category = Category.create!(category_params)
  end

  private
  
  def category_params
    params.require(:category).permit(
      :name
    )
  end

  
end
