describe("RealEstateView",function() {
	beforeEach(function(){
    this.model = new Backbone.Model({
      _id: 1,
      title: "delux property for sale",
      sold: false,
      tags:['delux'],
      amount: 567
    });
    this.view = new RealEstateView({model: this.model, template: this.templates.realestate});
    
    //create a fixture, the jquery plugin enables this
    setFixtures('<ul class="realestates"></ul>');
	});

  describe("rendering",function(){
    it("returns the view object, is chainable",function(){
      expect(this.view.render()).toEqual(this.view);
    });
  });

  describe("template", function() {
    beforeEach(function() {
      //append the rendered result to the fixture
      this.model.set({sold: true}, {silent: true});
      $('.realestates').append(this.view.render().el);
    });
  
    //we can now test against the fixture instead of the views el
    it("should have the correct url", function() {
       expect($('.realestates').find('a')).toHaveAttr('href', '#realestates/1');
    });

    it("should have the correct title", function() {
       expect($('.realestates').find('h2')).toHaveText('delux property for sale');
    });

    it("has a sold class", function() {
      expect($('.realestates a:first-child')).toHaveClass("sold");
    });
  });

  describe("events",function(){
    it("should react to model changes", function() {
      $('.realestates').append(this.view.render().el);
      this.model.set({title: "changed title"});
      expect($('.realestates').find('h2')).toHaveText('changed title');  
    });
  });

  describe("info view", function() {
    
    describe("When info button handler fired", function() {
      
      beforeEach(function() {
        $('ul.realestates').append(this.view.render().el);
        this.li = $('ul.realestates li:first');
        this.li.find('a.info').trigger('click');
      });
      
      it("shows the realestate info", function() {
        expect(this.li.find('div.realestate-info')).toBeVisible();
      });
    });
  });

});