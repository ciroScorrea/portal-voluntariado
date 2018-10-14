/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    
    //alert('teste!');
    
    $('[data-toggle=offcanvas]').click(function() {
        $(this).toggleClass('visible-xs text-center');
        $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
        $('.row-offcanvas').toggleClass('active');
        $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
        $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
        $('#btnShow').toggle();
    });
    
    $('#FotoAltera').mouseover(function(){
        $('#perfilFoto').css("display", "none");
        $('#perfilFotoAlt').css("display", "block");
    });
    $('#FotoAltera').mouseleave(function(){
        $('#perfilFoto').css("display", "block");
        $('#perfilFotoAlt').css("display", "none");
    });
    
    $("form#dataPhoto").submit(function(e) {
        e.preventDefault();
        var url = "AJAXServlet";
        var formData = new FormData(this);
        $.ajax({
            url: url,
            type: 'POST',
            data:{
                dados: formData,
                action: 'altFotoPerfil'
            },
            success: function (data) {
                alert(data)
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
    
    $("#uf").change(function() {
        getCidades();
    });
    
});

function verificaCPF(){
    if (validarCPF(document.clientesForm.cpf.value))
        {document.frmcpf.submit();}
    else 
        { alert('CPF inválido');}
}

function validarCPF(cpf) {  
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf === '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length !== 11 || 
        cpf === "00000000000" || 
        cpf === "11111111111" || 
        cpf === "22222222222" || 
        cpf === "33333333333" || 
        cpf === "44444444444" || 
        cpf === "55555555555" || 
        cpf === "66666666666" || 
        cpf === "77777777777" || 
        cpf === "88888888888" || 
        cpf === "99999999999")
            return false;       
    // Valida 1o digito 
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev === 10 || rev === 11)     
            rev = 0;    
        if (rev !== parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev === 10 || rev == 11) 
        rev = 0;    
    if (rev !== parseInt(cpf.charAt(10)))
        return false;       
    return true;   
}

function chooseFile() {
    document.getElementById("imagem").click();
}

function getCidades(){
    var estadoId = $("#uf").val();
    //alert(estadoId);
    var url = "AJAXServlet";
    $.ajax({
        url : url, // URL da sua Servlet
        data : {
            estadoId : estadoId
        }, // Parâmetro passado para a Servlet
        dataType : 'json',
        success : function(data) {
            // Se sucesso, limpa e preenche a combo de cidade
            $("#cidade").empty();
            $.each(data, function(i, obj) {
                $("#cidade").append('<option value=' + obj.id + '>' + obj.descricao + '</option>');
            });
        },
        error : function(request, textStatus, errorThrown) {
            alert(request.status + ', Error: ' + request.statusText);
            // Erro
        }
    });
}
