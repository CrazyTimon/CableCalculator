calcModel = Backbone.Model.extend({
});

calcCollection = Backbone.Collection.extend({
})


view = Backbone.View.extend({
    events:{
        'submit': 'submit'
    },
    initialize: function(){
        this.collection = new calcCollection();
        this.collection.add(calcDB);
    },
    render: function(){
        
    },
    submit: function(e){
        var result = 0,
            lengthsheiki = parseInt($('input[name=lengthsheiki]').val()),
            diametrscheki = parseInt($('input[name=diametrscheki]').val()),
            diametrsheiki = parseInt($('input[name=diametrsheiki]').val()),
            diametr = 8.40;
        e.preventDefault();
        result = 3.14 * lengthsheiki * ( diametrscheki - diametrsheiki )/4 * diametr;
        this.$('#result h1').html("L = " + result);
    }
});

$(function() {

var test = new view({el:'#calcForm'});
/*   





5 - Номер барабана (название барабана, которое должен выбирать пользователь)
500 - Диаметр щеки, мм (Dщ) diametrscheki
200 - Диаметр шейки, мм (dш)  diametrsheiki
230 - Длина шейки, мм ( l ) lengthsheiki
0.08 - Объем барабана, м3 obembarabana
18 - Вес барабана с обшивкой, кг vesbarabana

L=3,14*l*(D2н - d2ш)/4*D2
где:
L - Полная длина кабеля или провода, (м) (В калькуляторе это будет забивать пользователь)
l - длина шейки барабана, (мм) 
Dн - диаметр по намотанному кабелю на барабане, (мм) (В нашем калькуляторе Dн будет равен Dщ)
dш - диаметр шейки барабана, (мм) 
D - диаметр кабеля, (мм)

*/
});