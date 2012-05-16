describe('real estates collection',function(){
	beforeEach(function(){
    
    this.realestate1 = new Backbone.Model({
      id: 1,
      title: 'realestate 1',
      added: new Date(),
      sold: false
    });
    this.realestate2 = new Backbone.Model({
      id: 2,
      title: 'realestate 2',
      added: new Date(),
      sold: false
    });
    this.realestate3 = new Backbone.Model({
      id: 3,
      title: 'realestate 3',
      added: new Date(),
      sold: true
    });

    this.realestates = new RealEstates();
    this.realestateStub = sinon.stub(window,'RealEstate');
	});

  afterEach(function(){
    this.realestateStub.restore();
  });

  describe("When instantiated with model literal", function(){
    beforeEach(function(){
      this.model = new Backbone.Model({id: 5, title: "deluxe flat man", tags:['space','1800th']});
      this.realestateStub.returns(this.model);
      this.realestates.model = RealEstate;
      this.realestates.add({id: 5, title: "foo", tags:['foo','bar']});
    });

    it("should have 1 RealEstate model", function() {
      expect(this.realestates.length).toEqual(1);
      expect(this.realestateStub).toHaveBeenCalled();
    });

    it("should find a model by id",function(){
      expect(this.realestates.get(5).get("id")).toEqual(this.model.get("id"));
    });

    it("should find a model by index",function(){
      expect(this.realestates.at(0).get("id")).toEqual(this.model.get("id"));
    });

    it("should have called the constructor",function(){
      expect(this.realestateStub).toHaveBeenCalledOnce();
      expect(this.realestateStub).toHaveBeenCalledWith({id:5, title:"foo", tags:['foo','bar']});
    });
  });


  describe("when adding models",function(){
    it("should order models by time added by default",function(){
      this.realestates.model = RealEstate;
      this.realestates.add([this.realestate1, this.realestate2, this.realestate3]);
      
      expect(this.realestates.at(0)).toBe(this.realestate3);
      expect(this.realestates.at(1)).toBe(this.realestate2);
      expect(this.realestates.at(2)).toBe(this.realestate1);
    });
  });

  describe("when fetching collection from server",function(){
    beforeEach(function(){
      this.fixture = this.fixtures.RealEstates.valid;
      this.fixtureRealEstates = this.fixture.response.realestates;
      this.server = sinon.fakeServer.create();
      this.server.respondWith("GET", "/realestates", this.validResponse(this.fixture.response.realestates));
    });

    afterEach(function(){
      this.server.restore();
    });

     it("should make the correct request", function() {
      this.realestates.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toEqual("/realestates");
    });

    it("should parse the realestates from the response", function() {
      this.realestates.fetch();
      this.server.respond();
      expect(this.realestates.length).toEqual(this.fixture.response.realestates.length);
      expect(this.realestates.at(0).get('title')).toEqual(this.fixture.response.realestates[1].title);
    });
  });

  describe("filter methods",function(){
    it("should return sold realestates",function(){
      this.realestates.add([this.realestate1, this.realestate2, this.realestate3]);
      expect(this.realestates.length).toEqual(3);
      var sold = this.realestates.sold();
      expect(sold.length).toEqual(1);
    });
  });
});