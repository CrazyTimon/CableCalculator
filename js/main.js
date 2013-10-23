calcModel = Backbone.Model.extend({
});

calcCollection = Backbone.Collection.extend({
})


view = Backbone.View.extend({
    events:{
        'click .js-submit__btn': 'submit',
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
        this.$('.js-chosen').chosen({disable_search_threshold: 5});
    },
    showAdditionalData: function(){
        this.$('.additional_data').show(500);
    },
    changeCableMark: function(e){ 
        var cable_type = this.$('select[name=cable_mark]').val(),
            that = this;
        this.filtered_cable = calcDB.filter(function(type){return type.mark_id == cable_type });
        //достаем из массива только нужные нам марки
        this.$('select[name=sechenie]').html('');
        $.each(this.filtered_cable, function(val, el){
            that.$('select[name=sechenie]').append('<option value="' + el.id + '">' + el.sechenie + '</option>');             
        });
        this.$('select[name=sechenie]').chosen('destroy');
        this.$('select[name=sechenie]').chosen({disable_search_threshold: 5});
    },
    changeBarabanMark: function(){
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
        
        var cable_mark = this.$('select[name=cable_mark] option:selected').index()==0 ? this.$('select[name=cable_mark] option:eq(1)').html() : this.$('select[name=cable_mark] option:selected').html() ;
            result_text = "<br>Для <b>" + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + "</b> в количестве <b>";
            result_text += lenght_kabelya + "</b><br> на барабане <b>№ " + this.$('select[name=baraban] option:selected').html() + "</b> необходимо:";
            result_text += "<ul><li><b>" + result_barabans + "</b> барабанов</li><li> общий объем <b>" + (result_barabans * this.filtered_barabans.obem_barabana) + "</b></li><li>общий вес <b>" + (lenght_kabelya * (vesKabelya / 1000)) + "</b>кг</li></ul>";
        this.$('#result').html(result_text);
        this.$('#result').show(300);
    },
    submit: function(e){
        e.preventDefault();
        this.calculate();
    }
});

$(function() {
    var test = new view({el:'#calcForm'});
});