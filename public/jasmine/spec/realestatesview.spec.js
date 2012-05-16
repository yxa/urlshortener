describe("RealEstatesView",function() {
  beforeEach(function(){
    this.view = new RealEstatesView({collection: new Backbone.Collection()});  
  });

  describe("instantiation of view",function(){
    it("should create a list element",function(){
      expect(this.view.el.nodeName).toEqual("UL");
    });

     it("should have a class of realestates",function(){
      expect($(this.view.el)).toHaveClass("realestates");
    });
  });

  describe("rendering",function(){
    //create stubs and mock views
    beforeEach(function(){

      this.realestateView = new Backbone.View();
      this.realestateView.render = function(){
        this.el = document.createElement("li");
        return this;
      };

      this.realestateRenderSpy = sinon.spy(this.realestateView, "render");
      this.realestateViewStub = sinon.stub(window,"RealEstateView").returns(this.realestateView);

      //create three fake realestate model objects that we later should test rendering on
      this.realestate1 = new Backbone.Model({_id:1});
      this.realestate2 = new Backbone.Model({_id:2});
      this.realestate3 = new Backbone.Model({_id:3});

      //put the fake realestate models into a collection that the view should render
      this.view.collection = new Backbone.Collection([
         this.realestate1,
         this.realestate2,
         this.realestate3
      ]);
      //render the realestates view so that we can test the output
      this.view.render();
    });

    afterEach(function(){
      window.RealEstateView.restore();
    });

    it("should create a realestate view for each item in the collection",function(){ 
      expect(this.realestateViewStub).toHaveBeenCalledThrice();

      expect(this.realestateViewStub).toHaveBeenCalledWith({model:this.realestate1, template: this.templates.realestate});
      expect(this.realestateViewStub).toHaveBeenCalledWith({model:this.realestate2, template: this.templates.realestate});
      expect(this.realestateViewStub).toHaveBeenCalledWith({model:this.realestate3, template: this.templates.realestate});
    });

    it("should render each realestate view", function() {
      expect(this.realestateView.render).toHaveBeenCalledThrice();
    });

    it("appends the realestate to the realestates list", function() {
      expect($(this.view.el).children().length).toEqual(3);
    });
  });
});