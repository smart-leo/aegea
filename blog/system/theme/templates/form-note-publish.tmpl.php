<?php _LIB ('goodyear') ?>
<form
  id="form-note-publish"
  action="<?= @$content['form-note-publish']['form-action'] ?>"
  method="post"
>

<input
  type="hidden"
  name="note-id"
  value="<?= @$content['form-note-publish']['.note-id'] ?>" 
/>

<input
  type="hidden"
  id="browser-offset"
  name="browser-offset"
  value="unknown"
/>

<script>
d = new Date ()
document.getElementById ('browser-offset').value = - d.getTimezoneOffset()
</script>

<div class="form">

<div class="form-control">
  
  <div class="e2-post-time-control" style="display: none">
    <div class="form-label input-label">
      <label><?= _S ('ff--post-time') ?></label>
    </div>
    <div class="form-element">
      <div style="display: inline-block">
        <input type="text"
          tabindex="6"
          class="text width-2 goodyear"
          name="stamp"
          id="stamp"
          placeholder="<?= @$content['form-note-publish']['stamp-formatted'] ?>"
          data-goodyear-language="<?= $content['blog']['language'] ?>"
          data-goodyear-format="DD.MM.YYYY HH:mm:ss"
          data-goodyear-min-year="1970"
          data-goodyear-max-year="2035"
          data-goodyear-min-date="01-01-1970"
          data-goodyear-hour-picker="true"
          data-goodyear-minute-picker="true"
          data-goodyear-minute-picker="true"
          data-goodyear-minutes-step="1"
          value="<?= @$content['form-note-publish']['stamp-formatted'] ?>"
        />
      </div>
      
      &nbsp;&nbsp;&nbsp;

      <a href="#" class="e2-admin-link nu e2-schedule-contols-unrevealer e2-svgi "><?= _SVG ('close') ?></a>

    </div>
  </div>

</div>


<div class="form-control e2-publish-now-contols">
  <button type="submit" name="submit-button" value="publish" id="submit-button" class="e2-submit-button" <?php if (!@$content['form-note-publish']['can-publish?']) echo 'disabled'; ?>>
    <?= @$content['form-note-publish']['submit-text'] ?>
  </button>

  <?php if ($content['form-note-publish']['can-schedule?']) { ?>

  &nbsp;&nbsp;&nbsp;

  <a href="#" class="e2-admin-link nu e2-schedule-contols-revealer e2-svgi e2-svgi-calendar"><?= _SVG ('calendar') ?></a>

  <?php } ?>

</div>


<div class="form-control e2-schedule-contols" style="display: none">
  <button type="submit" disabled="disabled" name="submit-button" value="schedule" id="submit-schedule-button" class="e2-submit-button" <?php if (!@$content['form-note-publish']['can-publish?']) echo 'disabled'; ?>>
    <?= @$content['form-note-publish']['submit-schedule-text'] ?>
  </button>

</div>



</div>

</form>

<?php if (array_key_exists ('only', $content['notes'])) { ?>
<?php if (array_key_exists ('preview-href', $content['notes']['only'])) { ?>
<p class="admin-links"><a href="<?= $content['notes']['only']['preview-href'] ?>"><?= _S ('gs--secret-link') ?></a></p>
<?php } ?>
<?php } ?>
