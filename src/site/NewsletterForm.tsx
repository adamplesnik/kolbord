import Em from '../components/basic/Em'

const NewsletterForm = () => {
  const html = {
    __html: `
<div id="mc_embed_signup">
  <form action="https://adamplesnik.us14.list-manage.com/subscribe/post?u=510fca16846713406e33dbfde&amp;id=2cca3c97ec&amp;f_id=003695e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
    <div id="mc_embed_signup_scroll" class="w-full">
      <div class="flex flex-col w-full gap-4 items-center md:flex-row">
        <div class="mc-field-group flex gap-4 items-center"><label for="mce-EMAIL" class="shrink-0 w-32 md:w-auto">E-mail address</label><input type="email" name="EMAIL" class="w-full rounded border-slate-400 bg-slate-50 p-2 hover:border-slate-600" id="mce-EMAIL" required value=""></div>
        <div class="mc-field-group flex gap-4 items-center"><label for="mce-FNAME" class="shrink-0 w-32 md:w-auto">First name</label><input type="text" name="FNAME" class="w-full rounded border-slate-400 bg-slate-50 p-2 hover:border-slate-600" id="mce-FNAME" required value=""></div>
        <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="from-pink-500 to-pink-700 bg-gradient-to-br px-4 py-2 text-white hover:from-pink-600 transition-color inline-flex w-fit cursor-pointer items-center gap-1 rounded" value="Subscribe">
      </div>
    <div id="mce-responses" class="clear foot">
      <div class="response" id="mce-error-response" style="display: none;"></div>
      <div class="response" id="mce-success-response" style="display: none;"></div>
    </div>
    <div aria-hidden="true" style="position: absolute; left: -5000px;">
      /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
      <input type="text" name="b_510fca16846713406e33dbfde_2cca3c97ec" tabindex="-1" value="">
    </div>
    <a href="http://eepurl.com/iXjkd2" title="Mailchimp - email marketing made easy and fun" target="_blank" class="mt-4 flex pt-4 border-t border-t-slate-300 justify-center items-center gap-2 text-slate-500 text-xs">
    Powered by
      <span class="inline-block">
        <img src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" class="w-24 flex refferal_badge">
      </span>
    </a>
  </form>
</div>
`,
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-6 rounded-xl bg-white p-4 md:p-6">
      <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
        Sign up for our newsletter!
      </h2>
      <p className="text-sm text-slate-600">
        Be the first to know when we launch our public beta, discover new features, and learn how to
        become the{' '}
        <Em
          tooltipContent={<span>No on-boarding, no demo period, no credit card.</span>}
          tooltipId="newletterTooltip"
        >
          smoothest hot-desking
        </Em>{' '}
        pro.
      </p>
      <div dangerouslySetInnerHTML={html}></div>
    </div>
  )
}

export default NewsletterForm
