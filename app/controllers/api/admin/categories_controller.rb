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
    # redirect_to [:admin, :categories], notice: 'Category deleted!'
  end

  def create
    # byebug
    @category = Category.create!(category_params)

    # @category.save
  end

  private
  
  def category_params
    params.require(:category).permit(
      :name
    )
  end

  
end
