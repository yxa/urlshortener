describe('real-estate model', function() {

  beforeEach(function() {
    this.realestate = new RealEstate({
      title: "luxury flat in oslo",
      amount: 450,
      tags: ['luxury', 'deluxe']
    });

    var collection = { url: '/realestates' };
    this.realestate.collection = collection;
  });

  describe('when instantiated', function() {
    it('should set the sold attribute to default value',function() {
      expect(this.realestate.get('sold')).toEqual(false);
    });

    //TODO investigate how to work with dates
    it('should set the added attribute to time when added',function() {
      expect(this.realestate.get('added')).toBeTruthy();
    });

    it('should exhibit attributes', function(){
      expect(this.realestate.get('title')).toEqual("luxury flat in oslo");
      expect(this.realestate.get('amount')).toEqual(450);
      expect(this.realestate.get('tags').length).toEqual(2);
    });
  });

  describe('urls', function(){
    it('should return just the collection url when no id set',function(){
      expect(this.realestate.url()).toEqual('/realestates');
    });

    it('should return collection and id when id is set',function(){
      this.realestate.id = 1;
      expect(this.realestate.url()).toEqual("/realestates/1");
    });
  });

  describe('when saving',function(){

    beforeEach(function(){
      this.eventSpy = sinon.spy();      
    });

    it('should not save when title is empty',function(){
      this.realestate.bind("error",this.eventSpy);
      this.realestate.save({"title": ""});
      expect(this.eventSpy).toHaveBeenCalledOnce();
      expect(this.eventSpy).toHaveBeenCalledWith(this.realestate, "cannot have an empty title");
    });

     it('should not save when amount is empty',function(){
      this.realestate.bind("error",this.eventSpy);
      this.realestate.save({"title": "whatever", "amount": 0});
      expect(this.eventSpy).toHaveBeenCalledOnce();
      expect(this.eventSpy).toHaveBeenCalledWith(this.realestate, "cannot have an empty amount");
    });
  });
});