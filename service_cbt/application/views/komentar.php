<div id="komentar">
	<p>Komentar(<b id="jml_komen"><?=sizeof($komentar);?></b>)</p>
	<?php foreach ($komentar as $item_komentar=>$item):?>
	<div id="<?=$item['id'];?>" class="item_komentar">
		<p><?=$item['username'];?></p>
		<p><?=$item['tanggal'];?></p>
		<p><?=$item['konten'];?></p>
		<?php if($item['username'] == $username && $username != ""){ ?>
			<button onclick="hapus_komen(<?=$item['id'];?>);return false;">hapus</button>
		<?php } ?>
	</div>
	<?php endforeach; ?>

</div>

<?php if($username!=""){ ?>
	<input type="hidden" id="username" name="username" value="<?=$username;?>"/>
	<input type="hidden" id="id_post" name="id_post" value="<?=$id_post;?>"/>
	<textarea cols="30" rows="5" id="konten" ></textarea>
	<br/>
	<button onclick="post_komentar(); return false;">post</button>

	<script type="text/javascript">
	var total_komen = <?=sizeof($komentar);?>;
	function post_komentar(){
		var body = document.getElementById('komentar');
		var konten = document.getElementById('konten');
		var id_post = document.getElementById('id_post').value;
		var username = document.getElementById('username').value;
		var jml_komen = document.getElementById("jml_komen");
						
		var request = new XMLHttpRequest();
		var param = "username="+username+"&id_post="+id_post+"&konten="+konten.value;
		request.open("POST","<?=base_url()."index.php/post/post_komentar";?>", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.onreadystatechange = function(){
			if(this.readyState == this.DONE && this.status == 200){
				if(this.responseText != null){
					if(this.responseText == false){
						alert("komentar gagal");
					}else{
						//alert(this.responseText);
						var komen_obj = JSON.parse(this.responseText);
						var komen = document.createElement("div");
						komen.setAttribute("id",komen_obj['id']);
						komen.setAttribute("class","item_komentar");
						var nama = document.createElement("p");
						var tgl = document.createElement("p");
						var konten_baru = document.createElement("p");
						var btn_hapus = document.createElement("button");
						btn_hapus.setAttribute("onclick","hapus_komen("+komen_obj['id']+")");
						
						btn_hapus.innerHTML = "hapus";
						nama.innerHTML = komen_obj['username'];
						tgl.innerHTML = komen_obj['tanggal'];
						konten_baru.innerHTML = komen_obj['konten'];
						komen.appendChild(nama);
						komen.appendChild(tgl);
						komen.appendChild(konten_baru);
						komen.appendChild(btn_hapus);
						body.appendChild(komen);
						total_komen = komen_obj['jml_komen']
						jml_komen.innerHTML = total_komen;
						
						konten.value="";
					}
				}
			}
		}
		request.send(param);
		
	}

	function hapus_komen(id){
		var item_komen = document.getElementById(id);
		var body = document.getElementById('komentar');
		var jml_komen = document.getElementById("jml_komen");
						
		var request = new XMLHttpRequest();
		var param = "id="+id;
		request.open("POST","<?=base_url()."index.php/post/hapus";?>", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.onreadystatechange = function(){
			if(this.readyState == this.DONE && this.status == 200){
				if(this.responseText == true){
					body.removeChild(item_komen);
					total_komen--;
					jml_komen.innerHTML =total_komen;
				}else{
					alert(this.responseText);
				}
				
			}
		}
		request.send(param);
	}

	</script>
<?php } ?>