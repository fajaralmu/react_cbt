<?php if(isset($post)){

foreach ($post as $key=>$item):?>

<li style="display:block">
	<?=$item['judul'];?>
	<p><a href=<?=base_url()."index.php/akun/mypost/".$item['id'];?> >edit</a>
		<a href=<?=base_url()."index.php/post/hapus/".$item['id'];?> >hapus</a>
	</p>
</li>

<?php endforeach; }else{

?>
<form action=<?php echo base_url()."index.php/post/editpost";?> method="POST">
	<p>Judul</p>
	<input type="text" name="judul" value="<?=$judul;?>"/>
	<p>Konten</p>
	<textarea name="konten" rows="10" cols="40"><?=$konten;?></textarea>
	<p>Tgl</p>
	<input type="date" name="tanggal" value=<?=$tanggal;?>/>
	<input type="hidden" name="username" value=<?=$username;?>>
	<input type="hidden" name="id" value=<?=$id;?>>
	<br/>
	<p><input type="submit" value="Post"/></p>
</form>
<?php } ?>