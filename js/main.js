calcModel = Backbone.Model.extend({
});

calcCollection = Backbone.Collection.extend({
})


view = Backbone.View.extend({
    events:{
        'submit': 'submit',
        'change select[name=cable_mark]': 'changeCableMark',
        'change select[name=baraban]': 'changeBarabanMark',
        'click .js-show-additional_data': 'showAdditionalData'
    },
    initialize: function(){
        var cable_type = this.$('select[name=cable_mark]').val(),
            baraban_type = this.$('select[name=baraban]').val();
        this.collection = new calcCollection();
        this.collection.add(calcDB);
        this.render();
        this.filtered_cable = calcDB.filter(function(type){return type.mark_id == cable_type });
        this.filtered_barabans = barabansDB.filter(function(type){return type.id == baraban_type })[0];
        this.changeCableMark();
        this.changeBarabanMark();
        this.$('select[name=cable_mark]').chosen();
    },
    showAdditionalData: function(){
        this.$('.additional_data').show(500);
    },
    changeCableMark: function(){ 
        var cable_type = this.$('select[name=cable_mark]').val(),
            that = this;
        this.filtered_cable = calcDB.filter(function(type){return type.mark_id == cable_type });
        //достаем из массива только нужные нам марки
        this.$('select[name=sechenie]').html('');
        $.each(this.filtered_cable, function(val, el){
            that.$('select[name=sechenie]').append('<option value="' + el.id + '">' + el.sechenie + '</option>');             
        });
    },
    changeBarabanMark: function(){
        debugger;
        var baraban_type = this.$('select[name=baraban]').val(),
            that = this;
        this.filtered_barabans = barabansDB.filter(function(type){return type.id == baraban_type })[0];
        this.$('input[name=lengthsheiki]').val(this.filtered_barabans.length_sheiki);
        this.$('input[name=diametrscheki]').val(this.filtered_barabans.diametr_scheki);
        this.$('input[name=diametrsheiki]').val(this.filtered_barabans.diametr_sheiki);
        this.$('input[name=obembarabana]').val(this.filtered_barabans.obem_barabana);
        this.$('input[name=vesbarabana]').val(this.filtered_barabans.ves_barabana);
    },
    render: function(){
        var that = this;
        this.$('select[name=baraban], select[name=sechenie]').html('');
        $.each(barabansDB, function(val,el){
            that.$('select[name=baraban]').append('<option value="' + el.id + '">' + el.baraban_num + '</option>')
        });
    },
    calculate: function(){
        /*
         Николай:  ок, теперь надо вывести сумму объемов этих барабанов
         Отправлено в 13:46, среда
         я:  как посчитать?
        объем*барабан
        точнее умножить на кол-вобарабанов
         Николай:  да
         я:  гуд
         Николай:  так же и общий вес барабанов + вес намотанного на них кабеля
        */
        var result = 0,
            that = this,
            lenght_kabelya = this.$('input[name=metrs]').val(),
            lengthsheiki = parseInt(this.$('input[name=lengthsheiki]').val())/1000,
            diametrscheki = parseInt(this.$('input[name=diametrscheki]').val())/1000,
            diametrsheiki = parseInt(this.$('input[name=diametrsheiki]').val())/1000,
            diametr = parseFloat(this.filtered_cable.filter(function(type){
                return parseInt(type.id) == parseInt(that.$('select[name=sechenie]').val())
            })[0].diametr)/1000,
            vesKabelya = parseFloat(this.filtered_cable.filter(function(type){
                return parseInt(type.id) == parseInt(that.$('select[name=sechenie]').val())
            })[0].massa);
        result = 3.14 * lengthsheiki * ( Math.pow(diametrscheki, 2) - Math.pow(diametrsheiki, 2) )/(4 * Math.pow(diametr, 2));
        result_barabans = Math.ceil(parseInt(this.$('input[name=metrs]').val()) / result );
        /*
        Для (допустим) NYM 2х2,5 в количестве Х на барабане № Y необходимо: столько то барабанов, общий объем такой-то, общий вес такой-то
        */
        /*this.$('#result h1').html("Полная длинна кабеля(L) = " + result + "<br> Количество барабанов = " + result_barabans);
        this.$('#result h1').append("<br>Сумма объемов этих барабанов: " + (result_barabans * this.filtered_barabans.obem_barabana) );
        this.$('#result h1').append("<br>Общий вес барабанов: " + (result_barabans * this.filtered_barabans.ves_barabana) );
        this.$('#result h1').append("<br>Вес кабеля намотанного на барабаны: " + (lenght_kabelya * (vesKabelya / 1000)) + "кг");
        this.$('#result h1').append("<br>Cумма веса барабанов и веса намотанного на него кабеля: " + ((result_barabans * this.filtered_barabans.ves_barabana) + (lenght_kabelya * (vesKabelya / 1000))) );
        this.$('#result h1').append("<hr>");*/
        
            debugger;
        var cable_mark = this.$('select[name=cable_mark] option:selected').index()==0 ? this.$('select[name=cable_mark] option:eq(1)').html() : this.$('select[name=cable_mark] option:selected').html() ;
            result_text = "Для " + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + " в количестве ";
            result_text += lenght_kabelya + " на барабане № " + this.$('select[name=baraban] option:selected').html() + " необходимо: " + result_barabans;
            result_text +=" барабанов, общий объем " + (result_barabans * this.filtered_barabans.obem_barabana) + ", общий вес " + (lenght_kabelya * (vesKabelya / 1000)) + "кг";
        this.$('#result h3').html(result_text);
    },
    submit: function(e){
        e.preventDefault();
        this.calculate();
    }
});

$(function() {

var test = new view({el:'#calcForm'});
    /*
YM
NYM
ВВГЭнг(А)-LS
КВВГЭнг
КВВГЭнг
АВВГнг-LS - 0,6
ВВГнг-LS - 0,66<
АВВГнг-LS - 0,66
    */
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