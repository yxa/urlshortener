describe("approuter routes", function() {
  beforeEach(function() {
    this.model = new Backbone.Model({id: 1, amount: 123, sold: false,title: "deluxe flat man", tags:['space','1800th']});
    this.model.set({cid: 1, silent: true});
    this.collection = new Backbone.Collection();
    this.collection.add(this.model);
    this.fetchStub = sinon.stub(this.collection, "fetch").returns(null);
    this.realestatesViewStub = sinon.stub(window, "RealEstatesView").returns(new Backbone.View());
    this.realestatesDetailedViewStub = sinon.stub(window, "DetailedRealEstatesView").returns(new Backbone.View());
    this.realestatesCollectionStub = sinon.stub(window, "RealEstates").returns(this.collection);
    this.router = new AppRouter();
    this.routeSpy = sinon.spy();
    try {
      Backbone.history.start({silent:true, pushState:true});
    } catch(e) {
      this.router.navigate("elsewhere");
    }
  });

  afterEach(function() {
    window.RealEstatesView.restore();
    window.RealEstates.restore();
    window.DetailedRealEstatesView.restore();
    this.router.navigate("jasmine/SpecRunner.html");
  });

   it("fires the index route with a blank hash", function() {
    this.router.bind("route:index", this.routeSpy);
    this.router.navigate("", true);
    expect(this.routeSpy).toHaveBeenCalledOnce();
  });

  it("fires the realestate detail route", function() { 
    this.router.bind('route:realestates', this.routeSpy);
    this.router.navigate("realestates/1", true);
    expect(this.routeSpy).toHaveBeenCalledOnce();
    expect(this.routeSpy).toHaveBeenCalledWith("1");
  });

 
});

describe("AppRouter", function() {

  beforeEach(function() {
    this.collection = new Backbone.Collection();
    this.fetchStub = sinon.stub(this.collection, "fetch").returns(null);
    this.realestatesViewStub = sinon.stub(window, "RealEstatesView").returns(new Backbone.View());
    this.realestatesDetailedViewStub = sinon.stub(window, "DetailedRealEstatesView").returns(new Backbone.View());
    this.realestatesCollectionStub = sinon.stub(window, "RealEstates").returns(this.collection);
    
    this.router = new AppRouter();
  });
  
  afterEach(function() {
    window.RealEstatesView.restore();
    window.RealEstates.restore();
    window.DetailedRealEstatesView.restore();
  });

  describe("index handler", function() {
    describe("when no realestates exists", function() {
      beforeEach(function() {
        this.router.index();
      });
    
      it("creates a realestate collection", function() {
       //expect(this.realestatesCollectionStub).toHaveBeenCalledOnce();
        //expect(this.realestatesCollectionStub).toHaveBeenCalledWithExactly();
      });

      it("fetches the realestate list from the server", function() {
        expect(this.fetchStub).toHaveBeenCalledOnce();
        expect(this.fetchStub).toHaveBeenCalledWith();
      });
    
      it("creates a realesate view", function() {
        expect(this.realestatesViewStub).toHaveBeenCalledOnce();
        expect(this.realestatesViewStub).toHaveBeenCalledWith({collection: this.collection});
      });
    });
  });

  describe("realestate detailed view",function() {
      beforeEach(function() {
        this.router.realestates();
      });

       it("creates a detailed realesate view", function() {
        expect(this.realestatesDetailedViewStub).toHaveBeenCalledOnce();
      });
  });

});



