describe("RealEstatesView",function() {
  beforeEach(function(){
    this.view = new RealEstatesView();  
  });

  describe("instantiation of view",function(){
    it("should create a list element",function(){
      expect(this.view.el.nodeName).toEqual("UL");
    });

   
  });
});