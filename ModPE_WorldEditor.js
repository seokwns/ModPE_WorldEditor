(function(bl) {

    'use strict';

    const CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
        Button_ = android.widget.Button,
        TextView_ = android.widget.TextView,
        ToggleButton_ = android.widget.ToggleButton,
        ProgressBar_ = android.widget.ProgressBar,
        PopupWindow_ = android.widget.PopupWindow,
        EditText_ = android.widget.EditText,
        Toast_ = android.widget.Toast,
        View_ = android.view.View,
        OnCheckedChangeListener_ = android.widget.CompoundButton.OnCheckedChangeListener,
        OnTouchListener_ = View_.OnTouchListener,
        OnDismissListener_ = android.widget.PopupWindow.OnDismissListener,
        MotionEvent_ = android.view.MotionEvent,
        Gravity_ = android.view.Gravity,
        LinearLayout_ = android.widget.LinearLayout,
        ScrollView_ = android.widget.ScrollView,
        Params_ = LinearLayout_.LayoutParams,
        R = android.R,
        Build_ = android.os.Build,
        AlertDialog_ = android.app.AlertDialog,
        WIDTH = CONTEXT.getScreenWidth(),
        HEIGHT = CONTEXT.getScreenHeight(),
        Bitmap_ = android.graphics.Bitmap,
        BitmapFactory_ = android.graphics.BitmapFactory,
        BitmapDrawable_ = android.graphics.drawable.BitmapDrawable,
        drawable_ = android.graphics.drawable,
        ColorDrawable_ = android.graphics.drawable.ColorDrawable,
        GradientDrawable_ = android.graphics.drawable.GradientDrawable,
        Color_ = android.graphics.Color,
        Canvas_ = android.graphics.Canvas,
        Paint_ = android.graphics.Paint,
        Typeface_ = android.graphics.Typeface,
        LayerDrawable_ = android.graphics.drawable.LayerDrawable,
        PorterDuff_ = android.graphics.PorterDuff,
        PorterDuffColorFilter_ = android.graphics.PorterDuffColorFilter,
        File_ = java.io.File,
        FileOutputStream_ = java.io.FileOutputStream,
        FileInputStream_ = java.io.FileInputStream,
        FileReader_ = java.io.FileReader,
        BufferedReader_ = java.io.BufferedReader,
        BufferedInputStream_ = java.io.BufferedInputStream,
        BufferedOutputStream_ = java.io.BufferedOutputStream,
        InputStreamReader_ = java.io.InputStreamReader,
        ByteArrayOutputStream_ = java.io.ByteArrayOutputStream,
        AndroidHttpClient_ = android.net.http.AndroidHttpClient,
        ZipOutputStream_ = java.util.zip.ZipOutputStream,
        ZipEntry_ = java.util.zip.ZipEntry,
        ZipFile_ = java.util.zip.ZipFile,
        Thread_ = java.lang.Thread,
        Runnable_ = java.lang.Runnable,
        Handler_ = android.os.Handler,
        String_ = java.lang.String,
        URL_ = java.net.URL,
        ValueAnimator_ = android.animation.ValueAnimator,
        TypedValue_ = android.util.TypedValue,
        Environment_ = android.os.Environment,
        ConnectivityManager_ = android.net.ConnectivityManager,
        dp = TypedValue_.applyDimension(TypedValue_.COMPLEX_UNIT_DIP, 1, CONTEXT.getResources().getDisplayMetrics()),
        SDCARD = Environment_.getExternalStorageDirectory().getAbsolutePath(),
        DB_PATH = SDCARD + "/Astin/";



    /**
     * Show a view.
     * @since 2016-8-30
     * @param {android.view.View} view
     * @param {Number} gravity
     * @param {Number} x
     * @param {Number} y
     */
    function render(view, gravity, x, y) {
        CONTEXT.runOnUiThread({
            run() {
                try {
                    var window = new PopupWindow_(),
                        layout = new LinearLayout_(CONTEXT);

                    layout.addView(view);
                    window.setContentView(layout);
                    window.setWidth(-2);
                    window.setHeight(-2);
                    window.showAtLocation(CONTEXT.getWindow().getDecorView(), gravity, x, y);
                } catch (err) {
                    error(err);
                }
            }
        });
    }



    function error(err) {
        CONTEXT.runOnUiThread({
            run() {
                try {
                    var dialog = new AlertDialog_.Builder(CONTEXT);
                    dialog.setTitle("Error");
                    dialog.setMessage("Error\n\n - " + err.name + "\n - " + (err.lineNumber + 1) + "\n\n" + err.message);
                    dialog.show();
                } catch (err) {
                    print((err.lineNumber + 1) + " # " + err.message);
                }
            }
        });
    }



    function uiThread(func) {
        CONTEXT.runOnUiThread({
            run() {
                try {
                    func();
                } catch (err) {
                    print((err.lineNumber + 1) + " # " + err.message);
                }
            }
        });
    }



    function thread(func, sec) {
        new Thread_({
            run() {
                func();
                Thread_.sleep(sec);
            }
        }).start();
    }



    /**
     * Get current time.
     * @since 2016-9-10
     * @class
     */
    function Time() {
        var date = new Date(),
            m, now;

        this._year = date.getFullYear();
        this._month = date.getMonth() + 1;
        this._date = date.getDate();
        this._hours = date.getHours();
        this._minutes = date.getMinutes();
    }

    /**
     * Get current hour.
     * @since 2016-9-10
     * @return {Number} - Current hour
     */
    Time.prototype.getHour = function() {
        return this._hour;
    };

    /**
     * Get current minute.
     * @since 2016-9-10
     * @return {Number} - Current minute
     */
    Time.prototype.getMinute = function() {
        return this._minutes;
    };

    /**
     * Get current year.
     * @since 2016-9-10
     * @return {Number} - Current year
     */
    Time.prototype.getYear = function() {
        return this._year;
    };

    /**
     * Get current month.
     * @since 2016-9-10
     * @return {Number} - Current month
     */
    Time.prototype.getMonth = function() {
        return this._month;
    };

    /**
     * Get current date.
     * @since 2016-9-10
     * @return {Number} - Current date
     */
    Time.prototype.getDate = function() {
        return this._date;
    };

    /**
     * Get full time.
     * @since 2016-9-10
     * @return {String} - Full time
     */
    Time.prototype.getCurrentTime = function() {
        return this._year + "년 " + this._month + "월 " + this._day + "일 " + (this._hour > 12 ? ("오후" + (this._hour - 12)) : ("오전" + this._hour)) + ":" + this._minute;
    };



    function File(path) {
        this._path = path;
    }

    /**
     * Create dirctory path and a file.
     * @since 2016-9-5
     */
    File.prototype.create = function() {
        var file = new File_(this._path);

        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        if (!file.exists()) {
            file.createNewFile();
        }
    };

    File.prototype.exists = function() {
        var file = new File_(this._path);
        return file.exists();
    };



    /**
     * Read a data from the file.
     * @since 2016-9-5
     * @return {String}
     */
    File.prototype.read = function() {
        var fis = new FileInputStream_(new File_(this._path)),
            isr = new InputStreamReader_(fis),
            br = new BufferedReader_(isr),
            content = [],
            line;

        while ((line = br.readLine()) !== null) {
            content.push(line + "");
        }

        br.close();
        isr.close();
        fis.close();

        return content;
    };

    /**
     * Save content in the file.
     * @since 2016-9-10
     * @param {String} content
     */
    File.prototype.write = function(content) {
        var file = new File_(this._path),
            fos = new FileOutputStream_(file);

        fos.write(new String_(content).getBytes());
        fos.close();
    };

    /**
     * Zip the file.
     * @since 2016-9-10
     * @param {String} path
     */
    File.prototype.zip = function(path) {
        var fileList = [],
            input = new File_(this._path),
            output = new File_(path);

        if (!output.exists()) {
            output.getParentFile().mkdirs();
        }

        function getAllFilesInDirectory(dir) {
            try {
                if (dir.isFile()) {
                    fileList.push(dir.getAbsolutePath());
                    return;
                }

                var files = dir.listFiles();
                for (var e = 0, len = files.length; e < len; e++) {
                    getAllFiles(files[e]);
                }
            } catch (e) {
                error(e);
            }
        };

        getAllFilesInDirectory(input);

        var fos = new FileOutputStream_(output);
        var zos = new ZipOutputStream_(fos);

        for (var e = 0, len = fileList.length; e < len; e++) {
            var ze = new ZipEntry_(fileList[e].substring(input.getAbsolutePath().length() + 1, fileList[e].length()));
            zos.putNextEntry(ze);

            var fis = new FileInputStream_(fileList[e]),
                buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
                count;

            while ((count = fis.read(buffer)) > 0) {
                zos.write(buffer, 0, count);
            }

            zos.closeEntry();
            fis.close();
        }

        zos.close();
        fos.close();
    };

    /**
     * Unzip the file.
     * @since 2016-9-10
     * @param {String} path
     */
    File.prototype.unzip = function(path) {
        var output = new File_(path);
        output.getParentFile().mkdirs();

        try {
            var zip = new ZipFile_(new File_(this.path));
        } catch (err) {
            error(err);
        }

        var entries = zip.entries(),
            entrie, outputFile, bis, bos, buf, count;

        while (entries.hasNextElement()) {
            entrie = entries.nextElement();
            outputFile = new File_(output, entrie.getName());
            bis = new BufferedInputStream_(zip.getInputStream(entrie));
            bos = new BufferedOutputStream_(new FileOutputStream_(output));
            buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
            count = 0;

            while ((count = bis.read(buf)) >= 0) {
                bos.write(buf, 0, count);
            }

            bis.close();
            bos.close();
        }

        zip.close();
    };



    const Color = {
        BLACK: Color_.rgb(30, 30, 30),
        WHITE: Color_.parseColor("#FAFAFA"),
        RED: Color_.parseColor("#F44336"),
        RED_ACCENT: Color_.parseColor("#C62828"),
        PINK: Color_.parseColor("#E91E63"),
        PINK_ACCENT: Color_.parseColor("#AD1457")
    };
    Object.freeze(Color);



    function Canvas() {}

    /**
     * @since 2016-8-27
     * @param {android.view.View} view
     * @param {Number} width
     * @param {Number} height
     * @param {Number} x
     * @param {Number} y
     * @param {Number} color
     * @param {android.graphics.drawable.Drawable} drawable
     * @param {Number} [radius=15*dp] radius
     * @param {Number} alpha
     */
    Canvas.drawCircle = function(view, width, height, x, y, color, drawable, radius, alpha) {
        var bm = Bitmap_.createBitmap(width, height, Bitmap_.Config.ARGB_8888),
            canvas = new Canvas_(bm),
            paint = new Paint_();

        paint.setColor(color);

        if (alpha !== null) {
            paint.setAlpha(alpha);
        }

        paint.setAntiAlias(true);
        canvas.drawCircle(x, y, (radius === null ? 15 * dp : radius), paint);

        if (drawable === null) {
            view.setBackgroundDrawable(new BitmapDrawable_(bm));
        } else {
            view.setBackgroundDrawable(new LayerDrawable_([drawable, new BitmapDrawable_(bm)]));
        }
    };



    function Drawable() {}

    /**
     * provided by Astro(astr36@gmail.com)
     * @param {android.graphics.drawable.Drawable} drawable
     * @param {Number} color
     * @return {android.graphics.drawable.Drawable}
     */
    Drawable.setTint = function(drawable, color) {
        drawable.getPaint().setColorFilter(new PorterDuffColorFilter_(color, PorterDuff_.Mode.SRC_ATOP));
        return drawable;
    };

    Drawable.CHECKBOX_OFF = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_check_box_outline_blank_white_24dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.CHECKBOX_ON = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_check_box_white_24dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.RADIO_OFF = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_radio_button_unchecked_white_24dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.RADIO_ON = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_radio_button_checked_white_24dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.CLOSE = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_close_white_48dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.ADD = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_add_white_48dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.COMPLETE = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_check_white_48dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.MENU = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_menu_white_48dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.EDIT = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_mode_edit_white_48dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.COG = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_cog.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.BORDER_COLOR = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_border_color_white_48dp.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.HELP = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_help.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.CODEPEN = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_codepen.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };

    Drawable.WEBEX = color => {
        var image = new BitmapFactory_.decodeFile(DB_PATH + "ic_cisco_webex.png");
        return Drawable.setTint(new BitmapDrawable_(image), color);
    };



    Drawable.setPadding = function(drawable, l, t, r, b) {
        var layer = new LayerDrawable_([drawable]);
        layer.setLayerInset(0, l, t, r, b);
        return layer;
    };



    /**
     * Create a ripple effect.
     * @since 2016-8-29
     */
    function RippleDrawable() {
        this._view = null;
        this._width = 0;
        this._height = 0;
        this._x = 0;
        this._y = 0;
        this._effectColor = 0;
        this._event = () => {};
        this._drawable = null;
        this._duration = 200;
        this._max_radius = null;
    };

    /**
     * Set the width and height of the view shown the ripple effect.
     * @since 2016-8-29
     * @param {Number} width - Width of the view
     * @param {Number} height - Height of the view
     */
    RippleDrawable.prototype.setWH = function(width, height) {
        this._width = width;
        this._height = height;
        return this;
    };

    /**
     * Set the center of the ripple effect.
     * @since 2016-8-29
     * @param {Number} x - Position X of the ripple effect
     * @param {Number} y - Position Y of the ripple effect
     */
    RippleDrawable.prototype.setHotSpot = function(x, y) {
        this._x = x;
        this._y = y;
        return this;
    };

    /**
     * Set the ripple effect color.
     * @since 2016-8-29
     * @param {Number} color - Color of the ripple effect
     */
    RippleDrawable.prototype.setEffectColor = function(color) {
        this._effectColor = color;
        return this;
    };

    /**
     * @since 2016-8-29
     * @param {android.graphics.drawable.Drawable} drawable
     */
    RippleDrawable.prototype.setBackgroundDrawable = function(drawable) {
        this._drawable = drawable;
        return this;
    };

    /**
     * Set an event.
     * @since 2016-8-29
     * @param {Function} event
     */
    RippleDrawable.prototype.setEvent = function(event) {
        this._event = event;
        return this;
    };

    /**
     * Set duration of the effect.
     * @since 2016-8-29
     * @param {Number} duration
     */
    RippleDrawable.prototype.setDuration = function(duration) {
        this._duration = duration;
        return this;
    };

    /**
     * Set a view shown the ripple effect.
     * @since 2016-8-29
     * @param {android.view.View}
     */
    RippleDrawable.prototype.setView = function(view) {
        this._view = view;
        return this;
    };

    /**
     * Start the ripple effect.
     * @since 2016-8-29
     */
    RippleDrawable.prototype.start = function() {
        var radius = 10 * dp,
            max_radius = (this._max_radius == null ? ((Math.hypot(this._width, this._height) / 2) + 100 * dp) : this._max_radius),
            click = false;

        var valueAnimator = ValueAnimator_.ofFloat([radius, max_radius]),
            _valueAnimatorX = ValueAnimator_.ofFloat([this._x, this._width / 2]),
            _valueAnimatorY = ValueAnimator_.ofFloat([this._y, this._height / 2]);

        _valueAnimatorX.setDuration(this._duration);
        _valueAnimatorY.setDuration(this._duration);

        var thiz = this;
        valueAnimator.addUpdateListener(new ValueAnimator_.AnimatorUpdateListener({
            onAnimationUpdate: function(_valueAnimator) {
                var current_radius = _valueAnimator.getAnimatedValue(),
                    circle_point_x = _valueAnimatorX.getAnimatedValue(),
                    circle_point_y = _valueAnimatorY.getAnimatedValue();

                if (current_radius < max_radius) {
                    Canvas.drawCircle(thiz._view, thiz._width, thiz._height, circle_point_x, circle_point_y, thiz._effectColor, thiz._drawable, current_radius, null);
                }

                if (circle_point_x == thiz._width / 2) {
                    if (thiz._event != null && !click) {
                        thiz._event(thiz._view);
                    }

                    thiz._view.setBackgroundDrawable(thiz._drawable);
                    click = true;
                }
            }
        }));

        valueAnimator.setDuration(this._duration + 50);
        valueAnimator.start();
        _valueAnimatorX.start();
        _valueAnimatorY.start();
    };



    /**
     * Create a shadow drawable.
     * @since 2017-2-2
     * @class
     */
    function ShadeDrawable() {
        this.resource = CONTEXT.getDrawable(R_.drawable.dialog_frame);
        this.drawable = null;
    };

    ShadeDrawable.prototype.setDrawable = function() {

    };

    ShadeDrawable.prototype.create = function() {
        var layerDrawable = new LayerDrawable_([this.resource, new ColorDrawable_(Color_.WHITE)]);
        layerDrawable.setLayerInset(0, 3 * dp, 6 * dp, 3 * dp, 2 * dp);
        return layerDrawable;
    };



    function Button() {
        this._view = new Button_(CONTEXT);
        this._effectColor = Color_.rgb(0, 150, 255);
        this._width = 0;
        this._height = 0;
        this._drawable = null;
        this._duration = 200;
        this._listener = () => {};
    }

    /**
     * Set text of the Button.
     * @since 2016-8-27
     * @param {String} text - Button text
     */
    Button.prototype.setText = function(text) {
        this._view.setText(text);
        return this;
    };

    /**
     * Set a color of the shown text.
     * @since 2016-8-28
     * @param {Number} textColor - Color of the shown text
     */
    Button.prototype.setTextColor = function(textColor) {
        this._view.setTextColor(textColor);
        return this;
    };

    /**
     * Set a size of the shown text.
     * @since 2016-8-28
     * @param {Number} textSize - Size of the shown text
     */
    Button.prototype.setTextSize = function(textSize) {
        this._view.setTextSize(textSize);
        return this;
    };

    /**
     * Set the width and height of the button.
     * @since 2016-8-27
     * @param {Number} width - Width of the button
     * @param {Number} height - Height of the button
     */
    Button.prototype.setWH = function(width, height) {
        this._width = width;
        this._height = height;
        this._view.setLayoutParams(new Params_(width, height));
        return this;
    };

    /**
     * Set a ripple effect color.
     * @since 2016-8-28
     * @param {Number} textColor - Color of the ripple effect
     */
    Button.prototype.setEffectColor = function(effectColor) {
        this._effectColor = effectColor;
        return this;
    };

    Button.prototype.setBackgroundDrawable = function(drawable) {
        this._drawable = drawable;
        this._view.setBackgroundDrawable(drawable);
        return this;
    };

    Button.prototype.setDuration = function(duration) {
        this._duration = duration;
        return this;
    };

    /**
     * Set an click event.
     * @since 2016-8-28
     * @param {Funtion} event - Click event
     */
    Button.prototype.setEvent = function(event) {
        this._listener = event;
        return this;
    };

    Button.prototype.get = function() {
        var thiz = this;
        this._view.setBackgroundDrawable(this._drawable);
        this._view.setAllCaps(false);
        this._view.setOnTouchListener(new OnTouchListener_({
            onTouch: (view, event) => {
                switch (event.getAction()) {
                    case MotionEvent_.ACTION_DOWN:
                        Canvas.drawCircle(thiz._view, view.getWidth(), view.getHeight(), event.getX(), event.getY(), thiz._effectColor, thiz._drawable, null, null);
                        return true;

                    case MotionEvent_.ACTION_MOVE:
                        Canvas.drawCircle(thiz._view, view.getWidth(), view.getHeight(), event.getX(), event.getY(), thiz._effectColor, thiz._drawable, null, null);
                        return true;

                    case MotionEvent_.ACTION_UP:
                        if (thiz._duration != 0) {
                            new RippleDrawable()
                                .setView(thiz._view)
                                .setWH(view.getWidth(), view.getHeight())
                                .setHotSpot(event.getX(), event.getY())
                                .setDuration(thiz._duration)
                                .setEffectColor(thiz._effectColor)
                                .setBackgroundDrawable(thiz._drawable)
                                .setEvent(thiz._listener)
                                .start();
                        } else if (thiz._duration == 0) {
                            thiz._listener(view);
                        }
                        return true;

                    case MotionEvent_.ACTION_CANCEL:
                        if (thiz._duration != 0) {
                            new RippleDrawable()
                                .setView(thiz._view)
                                .setWH(view.getWidth(), view.getHeight())
                                .setHotSpot(event.getX(), event.getY())
                                .setDuration(thiz._duration)
                                .setEffectColor(thiz._effectColor)
                                .setBackgroundDrawable(thiz._drawable)
                                .setEvent(thiz._listener)
                                .start();
                        } else if (thiz._duration == 0) {
                            thiz._listener(view);
                        }
                        return true;
                }
            }
        }));

        return this._view;
    };

    Button.prototype.show = function(gravity, x, y) {
        render(this.get(), gravity, x, y);
    };



    function CircleButton() {
        this._view = new Button_(CONTEXT);
        this._radius = 50 * dp;
        this._color = Color_.BLACK;
        this._effectColor = Color_.rgb(0, 150, 255);
        this.drawable = null;
        this._drawable = null;
        this._shapeDrawable = null;
        this._listener = () => {};
    }

    /**
     * Set text of the button.
     * @since 2017-2-2
     * @param {String} str
     */
    CircleButton.prototype.setText = function(str) {
        this._view.setText(str);
        return this;
    };

    CircleButton.prototype.setTextSize = function(size) {
        this._view.setTextSize(size);
        return this;
    };

    CircleButton.prototype.setTextColor = function(color) {
        this._view.setTextColor(color);
        return this;
    };

    CircleButton.prototype.setRadius = function(radius) {
        this._radius = radius;
        this._view.setLayoutParams(new Params_(this._radius * 2, this._radius * 2));
        return this;
    };

    CircleButton.prototype.setColor = function(color) {
        this._color = color;
        return this;
    };

    CircleButton.prototype.setBackgroundDrawable = function(__drawable) {
        this.drawable = __drawable;
        if (this._shapeDrawable != null) {
            this._drawable = new LayerDrawable_([this._shapeDrawable, this.drawable]);
            this._view.setBackgroundDrawable(this._drawable);
        }
        return this;
    };

    CircleButton.prototype.setEffectColor = function(color) {
        this._effectColor = color;
        return this;
    };

    CircleButton.prototype.setEvent = function(__listener) {
        this._listener = __listener;
        return this;
    };

    CircleButton.prototype.get = function() {
        this._shapeDrawable = drawable_.ShapeDrawable(new drawable_.shapes.OvalShape());
        this._shapeDrawable.getPaint().setColor(this._color);

        if (this.drawable == null) this._drawable = this._shapeDrawable;
        else this._drawable = new LayerDrawable_([this._shapeDrawable, this.drawable]);

        var thiz = this;
        this._view.setAllCaps(false);
        this._view.setBackgroundDrawable(this._drawable);
        this._view.setOnTouchListener(new OnTouchListener_({
            onTouch: function(view, event) {
                switch (event.getAction()) {
                    case MotionEvent_.ACTION_DOWN:
                        return true;

                    case MotionEvent_.ACTION_MOVE:
                        return true;

                    case MotionEvent_.ACTION_UP:
                        thiz._listener(view);
                        return true;

                    case MotionEvent_.ACTION_CANCEL:
                        return true;
                }
            }
        }));

        return this._view;
    };

    CircleButton.prototype.show = function(gravity, x, y) {
        render(this.get(), gravity, x, y);
    };



    function CheckBox() {
        this._view = new ToggleButton_(CONTEXT);
        this._textView = new TextView_(CONTEXT);
        this._viewLayout = new LinearLayout_(CONTEXT);
        this._WIDTH = 0;
        this._HEIGHT = 0;
        this._checked = false;
        this._color = Color_.rgb(54, 69, 154);
        this._listener = () => {};

        this._textView.setTextSize(14);
        this._textView.setTextColor(Color_.BLACK);
        this._textView.setGravity(Gravity_.CENTER);
        this._view.setTextOn("");
        this._view.setTextOff("");

        this._viewLayout.setOrientation(0);
        this._viewLayout.setGravity(Gravity_.CENTER);
    }

    CheckBox.prototype.setText = function(str) {
        this._textView.setText(str);
        return this;
    };

    CheckBox.prototype.setTextSize = function(size) {
        this._textView.setTextSize(size);
        return this;
    };

    CheckBox.prototype.setTextColor = function(color) {
        this._textView.setTextColor(color);
        return this;
    };

    CheckBox.prototype.setChecked = function(checked) {
        var thiz = this;
        uiThread(() => {
            thiz._checked = checked;
            thiz._view.setChecked(thiz._checked);
        });
        return this;
    };

    CheckBox.prototype.setColor = function(color) {
        this._color = color;
        return this;
    };

    CheckBox.prototype.setParams = function(width, height) {
        this._WIDTH = width;
        this._HEIGHT = height;
        this._viewLayout.setLayoutParams(new Params_(this.WIDTH, this.HEIGHT));
        return this;
    };

    CheckBox.prototype.setOnCheckedChangeListener = function(__listener) {
        this._listener = __listener;
        return this;
    };

    CheckBox.prototype.getWidth = function() {
        return this._WIDTH;
    };

    CheckBox.prototype.getHeight = function() {
        return this._HEIGHT;
    };

    CheckBox.prototype.get = function() {
        var thiz = this;
        this._view.setBackgroundDrawable(es.astin.graphics.drawable.CHECKBOX_OFF(this._color));
        this._view.setLayoutParams(new Params_(30 * dp, 30 * dp));
        this._view.setOnCheckedChangeListener(new OnCheckedChangeListener_({
            onCheckedChanged: (toggle, isChecked) => {
                if (isChecked) {
                    toggle.setBackgroundDrawable(es.astin.graphics.drawable.CHECKBOX_ON(thiz._color));
                    thiz._listener(toggle, isChecked);
                }

                if (!isChecked) {
                    toggle.setBackgroundDrawable(es.astin.graphics.drawable.CHECKBOX_OFF(thiz._color));
                    thiz._listener(toggle, isChecked);
                }
            }
        }));
        this._viewLayout.addView(this._view);

        this._textView.setLayoutParams(new Params_(this._WIDTH - 35 * dp, this._HEIGHT));
        this._viewLayout.addView(this._textView);

        return this._viewLayout;
    };

    CheckBox.prototype.show = function(gravity, x, y) {
        render(this.get(), gravity, x, y);
    };



    function RadioButton() {
        this._view = new ToggleButton_(CONTEXT);
        this._textView = new TextView_(CONTEXT);
        this._viewLayout = new LinearLayout_(CONTEXT);
        this._WIDTH = 0;
        this._HEIGHT = 0;
        this._checked = false;
        this._color = Color_.rgb(54, 69, 154);
        this._listener = () => {};

        this._textView.setTextSize(14);
        this._textView.setTextColor(Color_.BLACK);
        this._textView.setGravity(Gravity_.CENTER);
        this._view.setTextOn("");
        this._view.setTextOff("");

        this._viewLayout.setOrientation(0);
        this._viewLayout.setGravity(Gravity_.CENTER);
    }

    RadioButton.prototype.setText = function(str) {
        this._textView.setText(str);
        return this;
    };

    RadioButton.prototype.setTextSize = function(size) {
        this._textView.setTextSize(size);
        return this;
    };

    RadioButton.prototype.setTextColor = function(color) {
        this._textView.setTextColor(color);
        return this;
    };

    RadioButton.prototype.setChecked = function(checked) {
        var thiz = this;
        uiThread(() => {
            thiz._checked = checked;
            thiz._view.setChecked(thiz._checked);
        });
        return this;
    };

    RadioButton.prototype.setColor = function(color) {
        this._color = color;
        return this;
    };

    RadioButton.prototype.setParams = function(width, height) {
        this._WIDTH = width;
        this._HEIGHT = height;
        this._viewLayout.setLayoutParams(new Params_(this.WIDTH, this.HEIGHT));
        return this;
    };

    RadioButton.prototype.setOnCheckedChangeListener = function(__listener) {
        this._listener = __listener;
        return this;
    };

    RadioButton.prototype.getWidth = function() {
        return this._WIDTH;
    };

    RadioButton.prototype.getHeight = function() {
        return this._HEIGHT;
    };

    RadioButton.prototype.get = function() {
        var thiz = this;
        this._view.setBackgroundDrawable(es.astin.graphics.drawable.RADIO_OFF(this._color));
        this._view.setLayoutParams(new Params_(30 * dp, 30 * dp));
        this._view.setOnCheckedChangeListener(new OnCheckedChangeListener_({
            onCheckedChanged: (toggle, isChecked) => {
                if (isChecked) {
                    toggle.setBackgroundDrawable(es.astin.graphics.drawable.RADIO_ON(thiz._color));
                    thiz._listener(toggle, isChecked);
                }

                if (!isChecked) {
                    toggle.setBackgroundDrawable(es.astin.graphics.drawable.RADIO_OFF(thiz._color));
                    thiz._listener(toggle, isChecked);
                }
            }
        }));
        this._viewLayout.addView(this._view);

        this._textView.setLayoutParams(new Params_(this._WIDTH - 35 * dp, this._HEIGHT));
        this._viewLayout.addView(this._textView);

        return this._viewLayout;
    };

    RadioButton.prototype.show = function(gravity, x, y) {
        render(this.get(), gravity, x, y);
    };



    function Space() {
        this._Space = new TextView_(CONTEXT);
        this._Space.setBackgroundDrawable(null);
    }

    Space.prototype.setWH = function(w, h) {
        this._Space.setLayoutParams(new Params_(w, h));
        return this;
    };

    Space.prototype.get = function() {
        return this._Space;
    };



    function Divider() {
        this._view = new TextView_(CONTEXT);
    }

    Divider.prototype.setWH = function(w, h) {
        this._view.setLayoutParams(new Params_(w, h));
        return this;
    };

    Divider.prototype.setColor = function(color) {
        this._view.setBackgroundDrawable(new ColorDrawable_(color));
        return this;
    };

    Divider.prototype.get = function() {
        return this._view;
    };



    function PopupWindow() {
        this.window = new PopupWindow_();
        this.mainLayout = new LinearLayout_(CONTEXT);
        this.titleLayout = new LinearLayout_(CONTEXT);

        this.dismissListener = function() {};
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        var that = this;

        this.window.setFocusable(true);
        this.mainLayout.setOrientation(1);
        this.titleLayout.setOrientation(0);
        this.window.setOnDismissListener(new OnDismissListener_() {
            onDismiss: function() {
                that.dismissListener();
            }
        });

        this.mainLayout.setGravity(Gravity_.TOP | Gravity_.CENTER);
        this.titleLayout.setGravity(Gravity_.LEFT | Gravity_.CENTER);
        this.mainLayout.setBackgroundColor(Color_.WHITE);
        this.titleLayout.setBackgroundColor(Color_.rgb(30, 30, 30));

        var layer = new LayerDrawable_([Drawable.MENU(Color.WHITE)]);
        layer.setLayerInset(0, 3 * dp, 3 * dp, 3 * dp, 3 * dp);
        this.titleLayout.addView(new Space().setWH(10 * dp, 1).get());
        this.menuBtn = new Button()
            .setText("")
            .setTextColor(Color_.WHITE)
            .setWH(25 * dp, 25 * dp)
            .setDuration(0)
            .setEffectColor(Color_.argb(0, 0, 0, 0))
            .setBackgroundDrawable(layer)
            .setEvent(function(view) {

            });
        this.titleLayout.addView(this.menuBtn.get());

        this.titleLayout.addView(new Space().setWH(10 * dp, 1).get());
        this.title = new TextView_(CONTEXT);
        this.title.setText("Title");
        this.title.setBackgroundDrawable(null);
        this.title.setPadding(5 * dp, 0, 0, 0);
        this.title.setTextColor(Color_.WHITE);
        this.title.setGravity(Gravity_.LEFT | Gravity_.CENTER);
        this.titleLayout.addView(this.title, WIDTH - 75 * dp, 45 * dp);

        this.close = new Button()
            .setText("")
            .setWH(20 * dp, 20 * dp)
            .setDuration(0)
            .setEffectColor(Color_.argb(0, 0, 0, 0))
            .setBackgroundDrawable(Drawable.CLOSE(Color.WHITE))
            .setEvent(function(view) {
                uiThread(function() {
                    that.sideLayout.removeAllViews();
                    that.mainLayout.removeAllViews();
                    if (that.contentView != null) that.ml.removeView(that.contentView);
                    that.window.dismiss();
                    that.dismissListener();
                });
            });
        this.titleLayout.addView(this.close.get());
        this.mainLayout.addView(this.titleLayout, -1, 45 * dp);

        this.sideLayout = new LinearLayout_(CONTEXT);
        this.sideLayout.setOrientation(1);
        this.sideLayout.setGravity(Gravity_.CENTER);
        this.sideLayout.setLayoutParams(new Params_(45 * dp, HEIGHT - 45 * dp));
        this.sideLayout.setBackgroundColor(Color_.rgb(30, 30, 30));
        this.ml = new LinearLayout_(CONTEXT);
        this.ml.setOrientation(0);
        this.ml.addView(this.sideLayout);
        this.contentView = null;
    }

    PopupWindow.prototype.setTitle = function(str) {
        this.title.setText(str);
        return this;
    };

    PopupWindow.prototype.setTitleColor = function(color) {
        this.titleLayout.setBackgroundColor(color);
        return this;
    };

    PopupWindow.prototype.setOnDismissListener = function(listener) {
        this.dismissListener = listener;
        return this;
    };

    PopupWindow.prototype.setIcon = function(icon) {
        this.menuBtn.setBackgroundDrawable(icon);
        return this;
    };

    PopupWindow.prototype.setWidth = function(value) {
        this.WIDTH = value;
        this.title.setLayoutParams(new Params_(value - 75 * dp, 45 * dp));
        return this;
    };

    PopupWindow.prototype.setHeight = function(value) {
        this.HEIGHT = value;
        this.sideLayout.setLayoutParams(new Params_(45 * dp, value - 45 * dp));
        return this;
    };

    PopupWindow.prototype.setContentView = function(view) {
        this.ml.addView(view);
        this.contentView = view;
        return this;
    };

    PopupWindow.prototype.setTextColor = function(color) {
        this.title.setTextColor(color);
        this.menuBtn.setBackgroundDrawable(Drawable.setPadding(Drawable.MENU(color), 3 * dp, 3 * dp, 3 * dp, 3 * dp));
        this.close.setBackgroundDrawable(Drawable.CLOSE(color));
    };

    PopupWindow.prototype.removeAllView = function() {
        this.ml.removeView(this.contentView);
    };

    PopupWindow.prototype.setMenuLayout = function(v) {
        this.sideLayout.addView(v);
    };

    PopupWindow.prototype.setMenuLayoutColor = function(color) {
        this.sideLayout.setBackgroundColor(color);
    };

    PopupWindow.prototype.show = function() {
        var that = this;
        uiThread(function() {
            that.mainLayout.addView(that.ml);
            that.window.setWidth(that.WIDTH);
            that.window.setHeight(that.HEIGHT);
            that.window.setContentView(that.mainLayout);
            that.window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.CENTER, 0, 0);
        });
    };
    
    PopupWindow.prototype.dismiss = function() {
        var thiz = this;
        uiThread(function() {
            if(thiz.window != null) {
                thiz.window.dismiss();
                thiz.window = null;
            }
        });
    }



    function Dialog() {

    }



    function Item() {
        this._view = new LinearLayout_(CONTEXT);
        this._textView = new TextView_(CONTEXT);
        this._button = new Button();
        this.width = null;
        this.height = null;
        this.buttonWidth = 150 * dp;
        this.buttonHeight = 35 * dp;

        this._view.setGravity(Gravity_.LEFT | Gravity_.CENTER);
        this._textView.setTextColor(Color_.BLACK);
        this._textView.setTextSize(16);
        this._textView.setGravity(Gravity_.LEFT | Gravity_.CENTER);
        this._textView.setPadding(15 * dp, 0, 0, 0);
        this._button.setTextColor(Color_.BLACK);
    }

    Item.prototype.setText = function(text) {
        this._textView.setText(text);
        return this;
    };

    Item.prototype.setWH = function(_width, _height) {
        this._view.setLayoutParams(new Params_(_width, _height));
        this.width = _width;
        this.height = _height;
        return this;
    };

    Item.prototype.setEvent = function(event) {
        this._button.setEvent(event);
        return this;
    };

    Item.prototype.setColor = function(color) {
        this._button.setBackgroundDrawable(new ColorDrawable_(color));
        return this;
    };

    Item.prototype.setEffectColor = function(color) {
        this._button.setEffectColor(color);
        return this;
    };

    Item.prototype.setButtonText = function(text) {
        this._button.setText(text);
        return this;
    };

    Item.prototype.setButtonWH = function(w, h) {
        this.buttonWidth = w;
        this.buttonHeight = h;
        this._button.setWH(w, h);
        return this;
    };

    Item.prototype.setTextColor = function(color) {
        this._button.setTextColor(color);
        return this;
    };

    Item.prototype.get = function() {
        this._view.addView(this._textView, this.width - this.buttonWidth, this.height);
        this._view.addView(this._button.get());
        return this._view;
    };



    /**
     * Create a image button.
     * @since 2016-9-10
     * @class
     * @param {String} path - Image path
     */
    function ImageButton(path) {
        this._path = path;
        this._view = new Button(CONTEXT);
    }

    ImageButton.prototype.setText = function(text) {

    };



    function Widget() {}

    Widget.TextView = function(text, textColor, textSize, width, height, drawable) {
        var tv = new TextView_(CONTEXT);
        tv.setText(text);
        if (textColor != null) tv.setTextColor(textColor);
        if (textSize != null) tv.setTextSize(textSize);
        if (drawable != null) tv.setBackgroundDrawable(drawable);
        tv.setLayoutParams(new Params_(width, height));

        return tv;
    };

    Widget.Button = function(text, textColor, textSize, width, height, drawable) {
        var btn = new Button_(CONTEXT);
        btn.setText(text);
        if (textColor != null) btn.setTextColor(textColor);
        if (textSize != null) btn.setTextSize(textSize);
        if (drawable != null) btn.setBackgroundDrawable(drawable);
        btn.setLayoutParams(new Params_(width, height));

        return btn;
    };



    /**
     * @since 2016-8-28
     * @class
     * @param {String} name
     * @param {Number} version
     */
    function ScriptInfo(name, version) {
        this._name = name || "";
        this._version = version || 1.0;
    }

    /**
     * Set version of the script.
     * @since 2016-8-28
     * @param {Number} ver - Script version
     */
    ScriptInfo.prototype.setVersion = function(ver) {
        this._version = ver;
        return this;
    };

    /**
     * Set a developer of the script.
     * @since 2016-8-28
     * @param {String} name - Developer name
     * @param {String} email - Developer E-mail
     */
    ScriptInfo.prototype.setDeveloper = function(name, email) {
        this._developer = [name, email];
        return this;
    };

    /**
     * Set the github url of the script
     * @since 2016-8-28
     * @param {String} url - Github url of the script
     */
    ScriptInfo.prototype.setUrl = function(url) {
        this._url = url;
        return this;
    };

    /**
     * Set the path of the script
     * @since 2016-8-28
     * @param {String} path - directory path of the script
     */
    ScriptInfo.prototype.setPath = function(path) {
        this._path = path;
        return this;
    };

    ScriptInfo.prototype.getVersion = function() {
        return this._version;
    };

    ScriptInfo.prototype.getPath = function() {
        return this._path;
    };

    ScriptInfo.prototype.getUrl = function() {
        return this._url;
    };

    ScriptInfo.prototype.getDeveloper = function() {
        return this._developer;
    };



    /**
     * Check connected network.
     * @since 2016-8-28
     * @class
     */
    function NetworkChecker() {}

    /**
     * @since 2016-8-28
     * @enum
     */
    NetworkChecker.WIFI = 0;
    NetworkChecker.MOBILE = 1;
    NetworkChecker.DISCONNECT = 2;

    /**
     * Get a type of network.
     * @since 2016-8-28
     * @return {Number}
     */
    NetworkChecker.prototype.getConnectedType = function() {
        var _manager = CONTEXT.getSystemService(CONTEXT.CONNECTIVITY_SERVICE);
        _mobile = _manager.getNetworkInfo(ConnectivityManager_.TYPE_MOBILE).isConnectedOrConnecting(),
            _wifi = _manager.getNetworkInfo(ConnectivityManager_.TYPE_WIFI).isConnectedOrConnecting();

        if (_wifi) {
            return NetworkChecker.WIFI;
        } else if (_mobile) {
            return NetworkChecker.MOBILE;
        } else {
            return NetworkChecker.DISCONNECT;
        }
    };

    /**
     * Check if network isconnected.
     * @since 2016-8-28
     * @return {Boolean}
     */
    NetworkChecker.prototype.isConnected = function() {
        return this.getConnectedType() !== 2;
    };



    /**
     * @since 2016-8-28
     * @class
     * @memberOf es.astin.net
     */
    function DownloadManager() {}

    /**
     * @since 2016-8-28
     * @param {ScriptInfo} info - Information of the downloaded script.
     */
    DownloadManager.prototype.setInfo = function(info) {
        this._info = info;
        return this;
    };

    DownloadManager.prototype.setProgressBar = function() {

    };

    DownloadManager.prototype.getProgress = function() {

    };

    DownloadManager.prototype.start = function() {
        var thiz = this;
        new Thread_({
            run() {
                try {
                    var file = new File(thiz._info.getPath());
                    file.create();

                    var _url = new URL_(thiz._info.getUrl()),
                        urlConnect = _url.openConnection();

                    urlConnect.connect();

                    var bis = new BufferedInputStream_(_url.openStream()),
                        fos = new FileOutputStream_(thiz._info.getPath()),
                        buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
                        count;

                    while ((count = bis.read(buffer)) !== -1) {
                        fos.write(buffer, 0, count);
                    }

                    fos.flush();
                    fos.close();
                    bis.close();
                } catch (err) {
                    error(err);
                }
            }
        }).start();
    };



    function readHtml(url) {
        try {
            var read = new ByteArrayOutputStream_(),
                response = AndroidHttpClient_.newInstance("userAgent").execute(new org.apache.http.client.methods.HttpGet(url)).getEntity().writeTo(read);

            read.close();
            return String_(read.toString());
        } catch (err) {
            error(err);
        }
    }



    function toast(text, duration) {
        uiThread(function() {
            var layout = new LinearLayout_(CONTEXT),
                textView = new TextView_(CONTEXT),
                _toast = new Toast_(CONTEXT),
                gradient = new GradientDrawable_();
                
            gradient.setColor(Color_.parseColor("#80000000"));
            gradient.setCornerRadius(3 * dp);
            textView.setText(text);
            textView.setTextColor(Color_.WHITE);
            textView.setGravity(Gravity_.CENTER);
            textView.setTextSize(18);
            textView.setPadding(10 * dp, 5 * dp, 10 * dp, 5 * dp);
            textView.setBackgroundDrawable(gradient);
            
            _toast.setView(textView);
            _toast.setDuration((duration == null? Toast_.LENGTH_SHORT:duration));
            _toast.show();
        });
    }



    function Vector3(x, y, z) {
        if (x instanceof Vector3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    Vector3.prototype.getDistance = function(x, y, z) {
        if (x instanceof Vector3) {
            return Math.sqrt(Math.pow(x.x - this.x, 2) + Math.pow(x.y - this.y, 2) + Math.pow(x.z - this.z, 2));
        }
        if (typeof x == "number") {
            return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) + Math.pow(z - this.z, 2));
        }
    };

    Vector3.prototype.add = function(x, y, z) {
        if (x instanceof Vector3) {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        }
        if (typeof x == " number") {
            this.x += x;
            this.y += y;
            this.z += z;
        }
        return this;
    };

    Vector3.prototype.set = function(x, y, z) {
        if (x instanceof Vector3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return this;
    };

    Vector3.prototype.getX = function() {
        return this.x;
    };

    Vector3.prototype.getY = function() {
        return this.y;
    };

    Vector3.prototype.getZ = function() {
        return this.z;
    };

    Vector3.prototype.toArray = function() {
        return [this.x, this.y, this.z];
    };

    Vector3.prototype.toString = function() {
        return "[ " + this.toArray().join(", ") + " ]";
    };



    function Pointer(x, y, z) {
        if (x instanceof Vector3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    Pointer.prototype.set = function(x, y, z) {
        if (x instanceof Vector3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    };

    Pointer.prototype.getX = function() {
        return this.x;
    };

    Pointer.prototype.getY = function() {
        return this.y;
    };

    Pointer.prototype.getZ = function() {
        return this.z;
    };

    Pointer.prototype.toString = function() {
        return "[ " + ([this.x, this.y, this.z]).join(", ") + " ]";
    };

    Pointer.prototype.toArray = function() {
        return [this.x, this.y, this.z];
    };



    function getEditVector(p1, p2) { //지형 스캔시 사용할 벡터 및 두 포인터 사이 거리를 반환합니다
        var start = [],
            end = [];

        start = p1.toArray();
        end = p2.toArray();
        //두 포인터의 좌표를 받아옵니다

        return {
            start: new Vector3(Math.min(start[0], end[0]), Math.min(start[1], end[1]), Math.min(start[2], end[2])),
            end: new Vector3(Math.max(start[0], end[0]), Math.max(start[1], end[1]), Math.max(start[2], end[2])),
            dx: Math.abs(start[0] - end[0]) + 1,
            dy: Math.abs(start[1] - end[1]) + 1,
            dz: Math.abs(start[2] - end[2]) + 1
        };
    }



    const DataTypes = {
        X: 0,
        Y: 1,
        Z: 2,
        ID: 3,
        DATA: 4
    };
    Object.freeze(DataTypes);

    function Block(x, y, z, id, data) {
        if (x instanceof Vector3) {
            this.x = x.getX();
            this.y = x.getY();
            this.z = x.getZ();
            this.id = (y == null ? bl.Level.getTile(x.getX(), x.getY(), x.getZ()) : y);
            this.data = (z == null ? bl.Level.getData(x.getX(), x.getY(), z.getZ()) : z);
        }
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
            this.z = z;
            this.id = (id == null ? bl.Level.getTile(x, y, z) : id);
            this.data = (data == null ? bl.Level.getData(x, y, z) : data);
        }
    }

    Block.prototype.getBlockData = function(array) {
        array = [this.x, this.y, this.z, this.id, this.data];
    };

    Block.prototype.getX = function() {
        return this.x;
    };

    Block.prototype.getY = function() {
        return this.y;
    };

    Block.prototype.getZ = function() {
        return this.z;
    };

    Block.prototype.getId = function() {
        return this.id;
    };

    Block.prototype.getData = function() {
        return this.data;
    };

    Block.prototype.set = function() {
        bl.Level.setTile(this.x, this.y, this.z, this.id, this.data);
    };

    Block.prototype.update = function(x, y, z, id, data) {
        if (x != null) {
            this.x = x;
        }
        if (y != null) {
            this.y = y;
        }
        if (z != null) {
            this.z = z;
        }
        if (id != null) {
            this.id = id;
        }
        if (data != null) {
            this.data = data;
        }
        /*
        if (type === DataTypes.X) {
            this.x = data;
        } else if (type === DataTypes.Y) {
            this.y = data;
        } else if (type === DataTypes.Z) {
            this.z = data;
        } else if (type === DataTypes.ID) {
            this.id = data;
        } else if (type === DataTypes.DATA) {
            this.data = data;
        }
        */
    };

    Block.prototype.getVector = function() {
        return new Vector3(this.x, this.y, this.z);
    }

    Block.prototype.rotate = function() { //지형 회전시 계단의 블록 데이터를 회전시켜줍니다
        var _degree, datas = [1, 3, 0, 2],
            rotateableBlocks = [53, 67, 108, 109, 134, 135, 136];

        if (rotateableBlocks.indexOf(this.id) === -1) {
            return;
        } else {
            if (degree === 90) {
                _degree = 1;
            } else if (degree === 180) {
                _degree = 2;
            } else if (degree === 270) {
                _degree = 3;
            }

            var hash = datas[(datas.indexOf(this.data) + _degree) % 4];
            return new Block(this.x, this.y, this.z, this.id, hash);
        }
    };

    Block.prototype.flip = function() {

    };



    function ItemIamgeLoader(name, data) { //아이템 텍스쳐 경로 및 파일이 달라져서 수정 요망.
        /*var meta = eval("" + new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"))+"");
        var meta_map = meta.map(function(i) {
            return i.name;
        });
        
        if(meta_map.indexOf(name) < 0) {
            return Bitmap.createBitmap(1, 1, Bitmap.Config.RGB_8888);
        }
        
        var uvs = meta[meta_map.indexOf(name)].uvs[data];
        var img = MC.Image.getTexture("items-opaque.png");
        var x = uvs[0] * img.getWidth();
        var y = uvs[1] * img.getHeight();
        var width = Math.ceil(uvs[2] * img.getWidth() - x);
        var height = Math.ceil(uvs[3] * img.getHeight() - y);
        
        return BitmapDrawable(Bitmap.createScaledBitmap(Bitmap.createBitmap(img, x, y, width, height), 32, 32, false));*/
    }
    
    
    
    function System() {}
    
    System.getAllEntity = function() {
        return bl.Entity.getAll().filter(function(element) {
            return !bl.Player.isPlayer(element);
        });
    };
    
    System.getAllPlayer = function() {
        return bl.Entity.getAll().filter(function(element) {
            return bl.Player.isPlayer(element);
        });
    };
    
    System.getPlayerByName = function(name) {
        var players = System.getAllPlayers();
        for(var i = 0; i < players.length; i++) {
            if(bl.Player.getName(players[i]) == name) {
                return players[i];
            }
        }
        return null;
    };
    
    System.isBannedPlayer = function(player) {
        for(var i = 0, len = Data.ban.length; i < len; i++) {
            if(Data.ban[i] == player) {
                return true;
            }
        }
        return false;
    };
    
    System.isEditablePlayer = function(player) {
        for(var i = 0, len = Data.editablePlayer.length; i < len; i++) {
            if(Data.editablePlayer[i] == player) {
                return true;
            }
        }
        return false;
    };



    const EditTypes = {
        terrain: {
            TYPE: "terrain_edit",
            FILL: 0,
            CHANGE: 1,
            COPY: 2,
            PASTE: 3,
            COVER: 4,
            WALL: 5,
            CIRCLE: 6,
            CIRCLE_HOLLOW: 7,
            SPHERE: 8,
            SPHERE_HOLLOW: 9,
            CYLINDER: 10,
            CYLINDER_HOLLOW: 11,
            ROTATE: 12,
            FLIP: 13,
            UNDO: 14,
            REDO: 15
        },
        server: {
            TYPE: "server_edit",
            BAN: 0,
            WHITE: 1,
            GIVE: 2,
            TLELPORT: 3,
            TELEPORT_ALL: 4,
            HEAL: 5,
            SPAWN: 6,
            EFFECT: 7,
            OBSERVE: 8
        },
        dump: function(target) { //provided by astro
            var arr = [];
            function getProperty(obj) {
                for (var objKey in obj) {
                    if(obj.hasOwnProperty(objKey)) {
                        arr.push(objKey);
                    }
                }
            }
            getProperty(target);
            return arr;
        }
    };
    Object.freeze(EditTypes);
    
    const string = {
        terrain: {
            FILL: ["채우기", "fill"],
            CHANGE: ["바꾸기", "change"],
            COPY: ["복사", "copy"],
            PASTE: ["붙어넣기", "paste"],
            COVER: ["덮기", "cober"],
            WALL: ["벽 만들기", "wall"],
            CIRCLE: ["원 만들기", "circle"],
            CIRCLE_HOLLOW: ["빈 원 만들기", "hollow circle"],
            SPHERE: ["구 만들기", "shpere"],
            SPHERE_HOLLOW: ["빈 구 만들기", "hollow sphere"],
            CYLINDER: ["원기둥 만들기", "cylinder"],
            CYLINDER_HOLLOW: ["빈 원기둥 만들기", "hollow cylinder"],
            ROTATE: ["회전", "rotate"],
            FLIP: ["반전", "flip"],
            UNDO: ["되돌리기", "undo"],
            REDO: ["다시 하기", "redo"]
        },
        server: {
            TYPE: "server_edit",
            BAN: 0,
            WHITE: 1,
            GIVE: 2,
            TLELPORT: 3,
            TELEPORT_ALL: 4,
            HEAL: 5,
            SPAWN: 6,
            EFFECT: 7,
            OBSERVE: 8
        }
    };
    Object.freeze(string);

    const RenderTypes = {
        CUBE: 0,
        CIRCLE: 1,
        SPHERE: 2,
        CYLINDER: 3,
        ROTATE: 4,
        FLIP: 5
    };
    Object.freeze(RenderTypes);

    var Data = {
        task: [], //지형 및 서버 작업 내용을 담을 배열
        ban: [], //밴 리스트
        editablePlayer: [], //지형 및 서버수정을 할 수 있는 플레이어 목록
        titleColor: Color_.parseColor("#4CAF50"), //윈도우의 타이틀 색깔
        sideColor: Color_.parseColor("#43A047"), //윈도우의 메뉴 색깔
        buttonColor: Color_.parseColor("#E0E0E0"),//Color_.parseColor("#CDDC39"), //윈도우 안 Item의 버튼 색깔
        buttonEffectColor: Color_.parseColor("#BDBDBD"),//parseColor("#C0CA33"), //윈도우 Item의 버튼 이펙트 색깔
        speed: 5 //지형 스캔 및 지형 수정 속도
    };

    function Editor(name) {
        this._worldName = name;
        this._copiedBlock = [];
        this._savedBlock = [];
        this._editedBlock = [];
        this._taskCount = 0;
        this._editCount = 0;
        this.__editCount = 0;
        this._editable = false;
        this._paste = false;
    }

    Editor.prototype.init = function() {
        var path = DB_PATH + "/world edit/" + this._worldName + ".editor",
            file = new File(path);

        if (file.exists()) {
            var read = file.read();
            Data = JSON.parse(read[0]);
            toast("데이터를 불러옵니다.");
        }
        if (!file.exists()) {
            toast("데이터 파일이 존재하지 않습니다.\n데이터 파일을 생성합니다.");
            file.create();
            file.write(JSON.stringify(Data));
        }
    };

    Editor.prototype.render = function(p1, p2, type, task, data) {
        var thiz = this;
        if (this._paste) { //붙여넣기 작업이 진행중이면
            toast("붙여넣기 모드가 활성화 되어있습니다.\n붙여넣기 작업을 먼저 마친 후에 시도하세요.");
            return;
        }
        
        if(this._editable) {
            toast("이미 다른 작업이 진행중입니다!\n작업이 끝난 후에 시도하세요.");
            return;
        }

        this._savedBlock[this._taskCount] = [];
        //스캔한 블럭을 담을 배열 생성
        switch (type) {
            case RenderTypes.CUBE:
                if (pointer == null || _pointer == null) {
                    toast("지형 수정 구간이 정해지지 않았습니다.\n구간을 지정해주세요.");
                    return;
                }
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                var editVector = getEditVector(p1, p2),
                    task_length = (editVector.dx * editVector.dy * editVector.dz);
                    
                uiThread(function() {
                    progressBar.setMax(task_length);
                    taskText.setText("지형 스켄중...");
                });
                new Thread_({
                    run() {
                        for (var dx = 0; dx < editVector.dx; dx++) { //x 변화량
                            for (var dy = 0; dy < editVector.dy; dy++) { //y 변화량
                                for (var dz = 0; dz < editVector.dz; dz++) { //z 변화량
                                    thiz._savedBlock[thiz._taskCount].push(new Block(editVector.start.getX() + dx, editVector.start.getY() + dy, editVector.start.getZ() + dz)); //스캔한 블럭을 스캔한 지형 배열에 추가
                                    thiz._editCount++; //스캔한 블록의 수
                                    Thread_.sleep(Data.speed);
                                    uiThread(function() {
                                        progressBar.setProgress(thiz._editCount);
                                    });
                                }
                            }
                        }

                        if (thiz._editCount === task_length) { //스캔한 블록의 수가 지정한 범위 안의 블록 수와 일치할 때
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            uiThread(function() {
                                progressBar.setProgress(0);
                                taskText.setText("지형 수정 중...");
                            });
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;

            case RenderTypes.CIRCLE: //data = [반지름, 속 비우기 여부, 블록 아이디, 블록 데이터]
                if (pointer == null) {
                    toast("지형 수정 구간이 정해지지 않았습니다.\n구간을 지정해주세요.");
                    return;
                }
                var task_length = Math.pow(((2 * radius) - 1), 2);
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                uiThread(function() {
                    progressBar.setMax(task_length);
                    taskText.setText("지형 스켄중...");
                });
                new Thread_({
                    run() {
                        var radius = data[0],
                            hollow = data[1];

                        for (var dx = -radius + 1; dx < radius; dx++) { //x 변화량
                            for (var dz = -radius + 1; dz < radius; dz++) { //z 변화량
                                thiz.__editCount++;
                                if ((Math.pow(dx, 2) + Math.pow(dz, 2)) < (Math.pow(radius - 0.5, 2))) {
                                    if (hollow && !(Math.pow(dx, 2) + Math.pow(dz, 2) >= (Math.pow((radius + 1.5), 2)))) { //속이 빈 원 옵션 체크
                                        continue;
                                    }
                                    thiz._savedBlock[thiz._taskCount].push(new Block(p1.getX() + dx, p1.getY(), p1.getZ() + dz)); //스캔한 블럭을 스캔한 지형 배열에 추가
                                    thiz._editCount++;
                                }
                                uiThread(function() {
                                    progressBar.setProgress(thiz.__editCount);
                                });
                                Thread_.sleep(Data.speed);
                            }
                        }

                        if (thiz.__editCount == task_length) { //작업 완료시
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            uiThread(function() {
                                progressBar.setProgress(0);
                                taskText.setText("지형 수정 중...");
                            });
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;

            case RenderTypes.SPHERE: //data = [반지름, 속 비우기 여부, 블록 아이디, 블록 데이터]
                if (pointer == null) {
                    toast("지형 수정 구간이 정해지지 않았습니다.\n구간을 지정해주세요.");
                    return;
                }
                var task_length = Math.pow(((2 * radius) - 1), 3);
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                uiThread(function() {
                    progressBar.setMax(task_length);
                    taskText.setText("지형 스켄중...");
                });
                new Thread_({
                    run() {
                        var radius = data[0],
                            hollow = data[1];

                        for (var dx = -radius + 1; dx < radius; dx++) { //x 변화량
                            for (var dy = -radius + 1; dy < radius; dy++) { //y 변화량
                                for (var dz = -radius + 1; dz < radius; dz++) { //z 변화량
                                    thiz.__editCount++;
                                    if ((Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2)) < (Math.pow((radius - 0.5), 2))) {
                                        if (hollow && !(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2) >= (Math.pow((radius - 1.5), 2)))) { //속이 빈 구 옵션 체크
                                            continue;
                                        }
                                        thiz._editCount++;
                                        thiz._savedBlock[thiz._taskCount].push(new Block(p1.getX() + dx, p1.getY() + dy, p1.getZ() + dz)); //스캔한 블럭을 스캔한 지형 배열에 추가
                                    }
                                    uiThread(function() {
                                        progressBar.setMax(thiz.__editCount),
                                    });
                                    Thread_.sleep(Data.speed);
                                }
                            }
                        }

                        if (thiz.__editCount == Math.pow(((2 * radius) - 1), 3)) {
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            uiThread(function() {
                                progressBar.setProgress(0);
                                taskText.setText("지형 수정 중...");
                            });
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;

            case RenderTypes.CYLINDER: //data = [반지름, 속 비우기 여부, 높이, 블록 아이디, 블록 데이터]
                if (pointer == null) {
                    toast("지형 수정 구간이 정해지지 않았습니다.\n구간을 지정해주세요.");
                    return;
                }
                var task_length = ((Math.pow(((2 * radius) - 1), 2)) * height)
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                uiThread(function() {
                    taskText.setText("지형 스켄중...");
                    progressBar.setMax(task_length);
                });
                new Thread_({
                    run() {
                        var radius = data[0],
                            hollow = data[1],
                            height = data[2];

                        for (var dx = -radius + 1; dx < radius; dx++) { //x 변화량
                            for (var dz = -radius + 1; dz < radius; dz++) { //z 변화량
                                for (var dh = 0; dh < height; dh++) {
                                    thiz.__editCount++;
                                    if ((Math.pow(dx, 2) + Math.pow(dz, 2)) < (Math.pow(radius - 0.5, 2))) {
                                        if (hollow && !(Math.pow(dx, 2) + Math.pow(dz, 2) >= (Math.pow((radius + 1.5), 2)))) { //속이 빈 원 옵션 체크
                                            continue;
                                        }
                                        thiz._savedBlock[thiz._taskCount].push(new Block(p1.getX() + dx, p1.getY() + dh, p1.getZ() + dz)); //스캔한 블럭을 스캔한 지형 배열에 추가
                                        thiz._editCount++;
                                    }
                                    uiThread(function() {
                                        progressBar.setProgress(thiz.__editCount);
                                    });
                                    Thread_.sleep(Data.speed);
                                }
                            }
                        }

                        if (thiz.__editCount == ((Math.pow(((2 * radius) - 1), 2)) * height)) {
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            uiThread(function() {
                                progressBar.setProgress(0);
                                taskText.setText("지형 수정 중...");
                            });
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;
        }
    };

    Editor.prototype.request = function(type, task, data) {
        if (type === EditTypes.terrain.TYPE) { //지형 작업 요청
            const thiz = this;
            this._editedBlock[this._taskCount] = []; //수정한 지형을 담을 배열 생성
            switch (task) {
                case EditTypes.terrain.FILL: //data = [채울 블록 아이디, 채울 블록 데이터]
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i]; //기존 블록 정보
                                var _block = new Block(block.getVector(), data[0], data[1]); //채워질 블록 정보
                                _block.set(); //블록 설치
                                thiz._editedBlock[thiz._taskCount].push(_block); //설치한 블록을 수정한 지형 배열에 추가
                                uiThread(function() {
                                    progressBar.setProgress(i + 1);
                                });
                                Thread_.sleep(Data.speed);

                                if (i == len - 1) {
                                    Data.task.push({ //작업 리스트에 추가
                                        type: EditTypes.terrain.FILL,
                                        count: thiz._editCount,
                                        content: "id: " + data[0] + ", data: " + data[1] + "으로 채우기"
                                    });
                                    toast(thiz._editCount + "개의 블록으로 채웠습니다.");
                                    thiz._taskCount++; //작업한 수 증가
                                    thiz._editCount = 0; //작업한 블록 수 초기화
                                    thiz._editable = false; //작업 종료
                                    uiThread(function() {
                                        taskText.setText("작업 중이 아닙니다.");
                                        progressBar.setProgress(0);
                                        progressBar.seMax(0);
                                    });
                                }
                            }
                        }
                    }).start();
                    break;

                case EditTypes.terrain.CHANGE: //data = [바꿔질 블록 아이디, 바꿔질 블록 데이터, 바꾼 후의 블록 아이디, 바꾼 후의 블록 데이터]
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i]; //바뀌기 전 블록 정보
                                if (block.getId() === data[0] && block.getData() === data[1]) { //만약 바꿔질 블록 정보가 data의 정보랑 같다면
                                    var _block = new Block(block.getVector(), data[2], data[3]); //바뀐 후의 블록 정보
                                    _block.set(); //블록 설치
                                    thiz._editedBlock[thiz._taskCount].push(_block); //설치한 블록을 수정한 지형 배열에 추가
                                    uiThread(function() {
                                        progressBar.setProgress(i + 1);
                                    });
                                    Thread_.sleep(Data.speed);

                                    if (i == len - 1) {
                                        Data.task.push({ //작업 리스트에 추가
                                            type: EditTypes.terrain.CHANGE,
                                            count: thiz._editCount,
                                            content: "id: " + data[0] + ", data: " + data[1] + "을 id: " + data[2] + ", data: " + data[3] + "으로 바꾸기"
                                        });
                                        thiz._taskCount++; //작업한 수 증가
                                        thiz._editCount = 0; //작업한 블록 수 초기화
                                        thiz._editable = false; //작업 종료
                                        uiThread(function() {
                                            taskText.setText("작업 중이 아닙니다.");
                                            progressBar.setProgress(0);
                                            progressBar.seMax(0);
                                        });
                                    }
                                }
                            }
                        }
                    }).start();
                    break;

                case EditTypes.terrain.COPY:
                    thiz._copiedBlock = thiz._savedBlock[thiz._taskCount]; //복사한 지형 = 스캔한 지형

                    Data.task.push({
                        type: EditTypes.terrain.COPY,
                        count: thiz._editCount,
                        content: thiz._editCount + "개의 블록을 복사함"
                    });
                    thiz.paste = true;
                    thiz._editCount = 0;
                    break;

                case EditTypes.terrain.COVER: //data = [덮을 블록 아이디, 덮을 블록 데이터]
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i];
                                if (bl.Level.getTile(block.getX(), block.getY(), block.getZ()) != 0 && bl.Level.getTile(block.getX(), block.getY() + 1, block.getZ()) === 0) { //만약 블록의 위가 공기일 때
                                    var _block = new Block(block.getX(), block.getY() + 1, block.getZ(), data[0], data[1]); //덮을 블록 정보
                                    _block.set(); //덮을 블록 설치
                                    thiz._editedBlock[thiz._taskCount].push(_block); //덮은 블록을 수정한 지형 배열에 추가
                                    uiThread(function() {
                                        progressBar.setProgress(i + 1);
                                    });
                                    Thread_.sleep(Data.speed);

                                    if (i == len - 1) {
                                        Data.task.push({ //작업 리스트에 추가
                                            type: EditTypes.terrain.COVER,
                                            count: thiz._editCount,
                                            content: "id: " + data[0] + ", data: " + data[1] + "으로 덮기"
                                        });
                                        thiz._taskCount++; //작업한 수 증가
                                        thiz._editCount = 0; //작업한 블록 수 초기화
                                        thiz._editable = false; //작업 종료
                                        uiThread(function() {
                                            taskText.setText("작업 중이 아닙니다.");
                                            progressBar.setProgress(0);
                                            progressBar.seMax(0);
                                        });
                                    }
                                }
                            }
                        }
                    }).start();
                    break;

                case EditTypes.terrain.WALL: //data = [벽 블록 아이디, 벽 블록 데이터]
                    var array_map_x = this._savedBlock[this._taskCount].map(function(i) {
                        return i.getX();
                    }); //스캔한 블럭의 x좌표 값
                    var array_map_z = this._savedBlock[this._taskCount].map(function(i) {
                        return i.getZ();
                    }); //스캔한 블럭의 z좌표 값

                    var x = [Math.max.apply(null, array_map_x), Math.min.apply(null, array_map_x)], //x좌표 값의 최대, 최소
                        z = [Math.max.apply(null, array_map_z), Math.min.apply(null, array_map_z)]; //z좌표 값의 최대, 최소
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i]; //기존 블록 정보
                                if (block.getX() === x[0] || block.getX() === x[1] || block.getZ() === z[0] || block.getZ() === z[1]) { //만약 기존 블록의 x or z 좌표가 최대 혹은 최소일 경우
                                    var _block = new Block(block.getVector(), data[0], data[1]); //벽 블록 정보
                                    _block.set(); //블록 설치
                                    thiz._editedBlock[thiz._taskCount].push(_block); //벽 블록 정보를 수정한 지형 배열에 추가
                                    uiThread(function() {
                                        progressBar.setProgress(i + 1);
                                    });
                                    
                                    if (i == len - 1) {
                                        Data.task.push({ //작업 리스트에 추가
                                            type: EditTypes.terrain.WALL,
                                            count: thiz._editCount,
                                            content: "id: " + data[0] + ", data: " + data[1] + "로 벽 만들기"
                                        });
                                        thiz._taskCount++; //작업한 수 증가
                                        thiz._editCount = 0; //작업한 블록 수 초기화
                                        thiz._editable = false; //작업 종료
                                        uiThread(function() {
                                            taskText.setText("작업 중이 아닙니다.");
                                            progressBar.setProgress(0);
                                            progressBar.seMax(0);
                                        });
                                    }
                                    Thread_.sleep(Data.speed);
                                }
                            }
                        }
                    }).start();
                    break;

                case EdiTypes.terrain.CIRCLE: //data = [반지름, 속 비우기 여부, 블록 아이디, 블록 데이터]
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i],
                                    _block = new Block(block.getVector(), data[2], data[3]);
                                _block.set();
                                thiz._editedBlock[thiz._taskCount].push(_block);
                                uiThread(function() {
                                    progressBar.setProgress(i + 1);
                                });
                                Thread_.sleep(Data.speed);

                                if (i == len - 1) {
                                    Data.task.push({ //작업 리스트에 추가
                                        type: EditTypes.terrain.CIRCLE,
                                        radius: data[0],
                                        hollow: data[1],
                                        count: thiz._editCount,
                                        content: "id: " + data[2] + ", data: " + data[3] + "로 원 만들기"
                                    });
                                    thiz._taskCount++; //작업한 수 증가
                                    thiz._editCount = 0; //작업한 블록 수 초기화
                                    thiz._editable = false; //작업 종료
                                    uiThread(function() {
                                        taskText.setText("작업 중이 아닙니다.");
                                        progressBar.setProgress(0);
                                        progressBar.seMax(0);
                                    });
                                }
                            }
                        }
                    }).start();
                    break;

                case EditTypes.terrain.SPHERE: //data = [반지름, 속 비우기 여부, 블록 아이디, 블록 데이터]
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i],
                                    _block = new Block(block.getVector(), data[2], data[3]);
                                _block.set();
                                thiz._editedBlock[thiz._taskCount].push(_block);
                                uiThread(function() {
                                    progressBar.setProgress(i + 1);
                                });
                                Thread_.sleep(Data.speed);

                                if (i == len - 1) {
                                    Data.task.push({ //작업 리스트에 추가
                                        type: EditTypes.terrain.SPHERE,
                                        radius: data[0],
                                        hollow: data[1],
                                        count: thiz._editCount,
                                        content: "id: " + data[2] + ", data: " + data[3] + "로 구 만들기"
                                    });
                                    thiz._taskCount++; //작업한 수 증가
                                    thiz._editCount = 0; //작업한 블록 수 초기화
                                    thiz._editable = false; //작업 종료
                                    uiThread(function() {
                                        taskText.setText("작업 중이 아닙니다.");
                                        progressBar.setProgress(0);
                                        progressBar.seMax(0);
                                    });
                                }
                            }
                        }
                    }).start();
                    break;

                case EditTypes.terrain.CYLINDER: //data = [반지름, 속 비우기 여부, 높이, 블록 아이디, 블록 데이터]
                    new Thread_({
                        run() {
                            for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                                var block = thiz._savedBlock[thiz._taskCount][i],
                                    _block = new Block(block.getVector(), data[3], data[4]);
                                _block.set();
                                thiz._editedBlock[thiz._taskCount].push(_block);
                                uiThread(function() {
                                    progressBar.setProgress(i + 1);
                                });
                                Thread_.sleep(Data.speed);

                                if (i == len - 1) {
                                    Data.task.push({ //작업 리스트에 추가
                                        type: EditTypes.terrain.CYLINDER,
                                        radius: data[0],
                                        height: data[2],
                                        hollow: data[1],
                                        count: thiz._editCount,
                                        content: "id: " + data[3] + ", data: " + data[4] + "로 원기둥 만들기"
                                    });
                                    thiz._taskCount++; //작업한 수 증가
                                    thiz._editCount = 0; //작업한 블록 수 초기화
                                    thiz._editable = false; //작업 종료
                                    uiThread(function() {
                                        taskText.setText("작업 중이 아닙니다.");
                                        progressBar.setProgress(0);
                                        progressBar.seMax(0);
                                    });
                                }
                            }
                        }
                    }).start();
                    break;

                case EditTypes.terrain.ROTATE:
                    break;

                case EditTypes.terrain.FLIP:
                    break;

                case EditTypes.terrain.UNDO:
                    break;

                case EditTypes.terrain.REDO:
                    break;
            }
        }

        if (type === EditTypes.server.TYPE) { //서버 작업 요청

        }
    };

    Editor.prototype.saveFromDirectory = function() {
        var path = DB_PATH + "/world edit/" + this._worldName + ".editor",
            file = new File(path);

        toast("데이터를 저장합니다.");
        file.create();
        file.write(JSON.stringify(Data));
    };



    function Command() {

    }




    var fButton, //메뉴 버튼
        editButton,
        _window,
        __window,
        main_window = null,
        edit_window = null,
        editor;

    var pointer, _pointer; //월드 에딧 포인터

    var x, y, mx, my,
        moving = false,
        _moving = false;
        
    var taskWindow = null,
        progressBar = null,
        taskText = null,
        taskLayout = null;
        
        
        
        
    function showTaskState() {
        uiThread(function() {
            taskLayout = new LinearLayout_(CONTEXT);
            taskWindow = new PopupWindow_();
            progressBar = new ProgressBar_(CONTEXT, null, R.attr.progressBarStyleHorizontal);
            taskText = new TextView_(CONTEXT);
            
            taskLayout.setOrientation(1);
            taskLayout.setGravity(Gravity_.CENTER);
            taskWindow.setBackgroundDrawable(new ColorDrawable_(Color_.parseColor("#80000000")));
            taskWindow.setWidth(150 * dp);
            taskWindow.setHeight(45 * dp);
            taskWindow.setOnDismissListener(new OnDismissListener_() {
                onDismiss: function() {
                    taskLayout.removeAllViews();
                    taskLayout = null;
                    progressBar = null;
                    taskText = null;
                    taskWindow = null;
                }
            });
            
            progressBar.getProgressDrawable().setColorFilter(Color_.parseColor("#4CAF50"), PorterDuff_.Mode.MULTIPLY);
            progressBar.setLayoutParams(new Params_(130 * dp, 3 * dp));
            progressBar.setMax(10);
            progressBar.setProgress(0);
            taskText.setText("작업 중이 아닙니다.");
            taskText.setTextColor(Color_.YELLOW);
            taskText.setGravity(Gravity_.CENTER);
            taskText.setTextSize(15);
            taskLayout.addView(taskText, 150 * dp, 40 * dp);
            taskLayout.addView(progressBar);
            
            taskWindow.setContentView(taskLayout);
            taskWindow.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.TOP|Gravity_.LEFT, 0, 0);
        });
    }

    
    
    function setEditData(task) {
        uiThread(function() {
            var window = new PopupWindow(),
                side_layout = new LinearLayout_(CONTEXT),
                edit = new Button();
                
            window.setTitleColor(Color_.parseColor("#3F51B5"));
            window.setMenuLayoutColor(Color_.parseColor("#3949AB"));
            window.setTextColor(Color_.WHITE);
            side_layout.setGravity(Gravity_.CENTER);
            
            edit.setText("")
                .setWH(45 * dp, 45 * dp)
                .setDuration(0)
                .setEffectColor(Color_.argb(0, 0, 0, 0))
                .setBackgroundDrawable(new LayerDrawable_([new ColorDrawable_(Color_.WHITE), Drawable.setPadding(Drawable.EDIT(Color_.BLACK), 10 * dp, 10 * dp, 10 * dp, 10 * dp)]))
                .setEvent(function(v) {
                    
                });
            side_layout.addView(edit.get());
            window.setMenuLayout(side_layout);
            
            var main = new LinearLayout_(CONTEXT);
            main.setOrientation(1);
            main.setGravity(Gravity_.CENTER);
            switch(task) {
                case EditTypes.terrain.FILL:
                case EditTypes.terrain.WALL:
                case EditTypes.terrain.COVER:
                    var click = false;
                    window.setTitle("Terrain Edit - " + EditTypes.dump(EditTypes.terrain)[task + 1]);
                    var editText = [], text = [["블럭 아이디: ", "블럭 아이디를 입력하세요."], ["블럭 데이터: ", "블럭 데이터(데미지)를 입력하세요."]];
                    for(var i = 0; i < 2; i++) {
                        var editLayout = new LinearLayout_(CONTEXT);
                        editLayout.setOrientation(0);
                        editLayout.setGravity(Gravity_.LEFT|Gravity_.CENTER);
                        
                        var textView = new TextView_(CONTEXT);
                        textView.setText(text[i][0]);
                        textView.setTextColor(Color_.BLACK);
                        textView.setTextSize(18);
                        textView.setGravity(Gravity_.CENTER);
                        textView.setLayoutParams(new Params_(100 * dp, 45 * dp));
                        editLayout.addView(textView);
                        
                        editText[i] = new EditText_(CONTEXT);
                        editText[i].setHint(text[i][1]);
                        editText[i].setHintTextColor(Color_.GRAY);
                        editText[i].setLayoutParams(new Params_(200 * dp, 45 * dp));
                        editText[i].setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_FULLSCREEN);
                        editLayout.addView(editText[i]);
                        main.addView(editLayout);
                    }
                    
                    var linear = new LinearLayout_(CONTEXT);
                    linear.setOrientation(0);
                    linear.setGravity(Gravity_.CENTER);
                    
                    linear.addView(new Button()
                        .setText("블럭 찾기")
                        .setWH(100 * dp, 35 * dp)
                        .setEffectColor(Color_.argb(140, 140, 140, 140))
                        .setEvent(function(v) {
                            if(!click) {
                                var _linear = new LinearLayout_(CONTEXT);
                                _linear.setOrientation(0);
                                _linear.setGravity(Gravity_.CENTER);
                            }
                        })
                        .get());
                    linear.addView(new Space().setWH(5 * dp, 0).get());
                    linear.addView(new Button()
                        .setText("작업 시작")
                        .setWH(100 * dp, 35 * dp)
                        .setEffectColor(Color_.argb(140, 140, 140, 140))
                        .setEvent(function(v) {
                            editor.render(pointer, _pointer, RenderTypes.CUBE, task, [parseInt(editText[0].getText().toString()), parseInt(editText[1].getText().toString())]);
                        })
                        .get());
                    main.addView(new Space().setWH(1, 20* dp).get());
                    main.addView(linear, 300 * dp, -2);
                    break;
                    
                case EditTypes.terrain.CIRCLE:
                case EditTypes.terrain.CIRCLE_HOLLOW:
                case EditTypes.terrain.SPHERE:
                case EditTypes.terrain.SPHERE_HOLLOW:
                    window.setTitle("Terrain Edit - " + EditTypes.dump(EditTypes.terrain)[task + 1]);
                    var editText = [], text = [["블럭 아이디 : ", "블럭 아이디를 입력하세요."], ["블럭 데이터 : ", "블럭 데이터(데미지)를 입력하세요."], ["반지름 : ", "반지름을 입력하세요."]];
                    for(var i = 0; i < 2; i++) {
                        var editLayout = new LinearLayout_(CONTEXT);
                        editLayout.setOrientation(0);
                        editLayout.setGravity(Gravity_.LEFT|Gravity_.CENTER);
                        
                        var textView = new TextView_(CONTEXT);
                        textView.setText(text[i][0]);
                        textView.setTextColor(Color_.BLACK);
                        textView.setTextSize(18);
                        textView.setGravity(Gravity_.CENTER);
                        textView.setLayoutParams(new Params_(100 * dp, 45 * dp));
                        editLayout.addView(textView);
                        
                        editText[i] = new EditText_(CONTEXT);
                        editText[i].setHint(text[i][1]);
                        editText[i].setHintTextColor(Color_.GRAY);
                        editText[i].setLayoutParams(new Params_(200 * dp, 45 * dp));
                        editText[i].setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_FULLSCREEN);
                        editLayout.addView(editText[i]);
                        main.addView(editLayout);
                    }
                    
                    var linear = new LinearLayout_(CONTEXT);
                    linear.setOrientation(0);
                    linear.setGravity(Gravity_.CENTER);
                    
                    linear.addView(new Button()
                        .setText("블럭 찾기")
                        .setWH(100 * dp, 35 * dp)
                        .setEffectColor(Color_.argb(140, 140, 140, 140))
                        .setEvent(function(v) {
                            if(!click) {
                                var _linear = new LinearLayout_(CONTEXT);
                                _linear.setOrientation(0);
                                _linear.setGravity(Gravity_.CENTER);
                            }
                        })
                        .get());
                    linear.addView(new Space().setWH(5 * dp, 0).get());
                    linear.addView(new Button()
                        .setText("작업 시작")
                        .setWH(100 * dp, 35 * dp)
                        .setEffectColor(Color_.argb(140, 140, 140, 140))
                        .setEvent(function(v) {
                            editor.render(pointer, _pointer, RenderTypes.CUBE, task, [parseInt(editText[0].getText().toString()), parseInt(editText[1].getText().toString())]);
                        })
                        .get());
                    main.addView(new Space().setWH(1, 20* dp).get());
                    main.addView(linear, 300 * dp, -2);
                    break;
            }
            
            window.setContentView(main);
            window.setWidth(350 * dp);
            window.setHeight(300 * dp);
            window.show();
        });
    }




    function EditWindow() {
        uiThread(function() {
            var edit_side_layout = new LinearLayout_(CONTEXT);
            edit_side_layout.setOrientation(1);
            edit_side_layout.setGravity(Gravity_.CENTER);
            var server_edit = new Button()
                .setText("")
                .setWH(45 * dp, 45 * dp)
                .setDuration(0)
                .setEffectColor(Color_.argb(0, 0, 0, 0))
                .setBackgroundDrawable(new LayerDrawable_([new ColorDrawable_(Color_.WHITE), Drawable.setPadding(Drawable.EDIT(Color_.BLACK), 10 * dp, 10 * dp, 10 * dp, 10 * dp)]))
                .setEvent(function(v) {
                    //edit_window.removeAllViews();
                    server_edit.setBackgroundDrawable(new LayerDrawable_([new ColorDrawable_(Color_.WHITE), Drawable.setPadding(Drawable.EDIT(Color_.BLACK), 10 * dp, 10 * dp, 10 * dp, 10 * dp)]));
                    cube_terrain_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.CODEPEN(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    figure_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.WEBEX(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    setting.setBackgroundDrawable(Drawable.setPadding(Drawable.COG(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                });
            edit_side_layout.addView(server_edit.get());

            var cube_terrain_edit = new Button()
                .setText("")
                .setWH(45 * dp, 45 * dp)
                .setDuration(0)
                .setEffectColor(Color_.argb(0, 0, 0, 0))
                .setBackgroundDrawable(Drawable.setPadding(Drawable.CODEPEN(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp))
                .setEvent(function(v) {
                    cube_terrain_edit.setBackgroundDrawable(new LayerDrawable_([new ColorDrawable_(Color_.WHITE), Drawable.setPadding(Drawable.CODEPEN(Color_.BLACK), 10 * dp, 10 * dp, 10 * dp, 10 * dp)]));
                    server_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.EDIT(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    figure_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.WEBEX(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    setting.setBackgroundDrawable(Drawable.setPadding(Drawable.COG(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                });
            edit_side_layout.addView(cube_terrain_edit.get());

            var figure_edit = new Button()
                .setText("")
                .setWH(45 * dp, 45 * dp)
                .setEffectColor(Color_.argb(0, 0, 0, 0))
                .setDuration(0)
                .setBackgroundDrawable(Drawable.setPadding(Drawable.WEBEX(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp))
                .setEvent(function(v) {
                    figure_edit.setBackgroundDrawable(new LayerDrawable_([new ColorDrawable_(Color_.WHITE), Drawable.setPadding(Drawable.WEBEX(Color_.BLACK), 10 * dp, 10 * dp, 10 * dp, 10 * dp)]));
                    cube_terrain_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.CODEPEN(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    server_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.EDIT(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    setting.setBackgroundDrawable(Drawable.setPadding(Drawable.COG(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                });
            edit_side_layout.addView(figure_edit.get());

            var setting = new Button()
                .setText("")
                .setWH(45 * dp, 45 * dp)
                .setDuration(0)
                .setEffectColor(Color_.argb(0, 0, 0, 0))
                .setBackgroundDrawable(Drawable.setPadding(Drawable.COG(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp))
                .setEvent(function(v) {
                    setting.setBackgroundDrawable(new LayerDrawable_([new ColorDrawable_(Color_.WHITE), Drawable.setPadding(Drawable.COG(Color_.BLACK), 10 * dp, 10 * dp, 10 * dp, 10 * dp)]));
                    cube_terrain_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.CODEPEN(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    figure_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.WEBEX(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                    server_edit.setBackgroundDrawable(Drawable.setPadding(Drawable.EDIT(Color_.WHITE), 10 * dp, 10 * dp, 10 * dp, 10 * dp));
                });
            edit_side_layout.addView(setting.get());


            var main_layout = new LinearLayout_(CONTEXT);
            main_layout.setOrientation(1);
            main_layout.setPadding(0, 0, 0, 3 * dp);
            main_layout.addView(new Item()
                .setText("undo")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("undo")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("redo")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("redo")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("채우기")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {
                    setEditData(EditTypes.terrain.FILL);
                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("바꾸기")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("덮기")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {
                    setEditData(EditTypes.terrain.COVER);
                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("벽")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {
                    setEditData(EditTypes.terrain.WALL);
                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("복사")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("copy")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("붙어넣기")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("paste")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("원")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("구")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());

            main_layout.addView(new Item()
                .setText("원기둥")
                .setWH(300 * dp, 45 * dp)
                .setEvent(function() {

                })
                .setButtonWH(70 * dp, 35 * dp)
                .setButtonText("edit")
                .setColor(Data.buttonColor)
                .setEffectColor(Data.buttonEffectColor)
                .get());
            var scroll = new ScrollView_(CONTEXT);
            scroll.addView(main_layout);


            edit_window = new PopupWindow();
            edit_window.setTitle("Terrain Edit Window");
            edit_window.setOnDismissListener(function() {
                edit_window = null;
            });
            edit_window.setMenuLayout(edit_side_layout);
            edit_window.setContentView(scroll);
            edit_window.setTextColor(Color_.BLACK);
            edit_window.setTitleColor(Data.titleColor);
            edit_window.setMenuLayoutColor(Data.sideColor);
            edit_window.setWidth(350 * dp);
            edit_window.setHeight(300 * dp);
            edit_window.show();
        });
    }




    function makeEditButton() {
        uiThread(function() {
            var gradient = new GradientDrawable_();
            gradient.setCornerRadius(900 * dp);
            gradient.setColor(Color_.parseColor("#212121"));
            gradient.setStroke(3 * dp, Color_.parseColor("#424242"));
            var layer = new LayerDrawable_([gradient, Drawable.EDIT(Color.WHITE)]);
            layer.setLayerInset(1, 10 * dp, 10 * dp, 10 * dp, 10 * dp);

            editButton = new Button_(CONTEXT);
            editButton.setText("");
            editButton.setBackgroundDrawable(layer);
            editButton.setLayoutParams(new Params_(45 * dp, 45 * dp));
            editButton.setOnTouchListener(new OnTouchListener_() {
                onTouch: function(view, event) {
                    if (event.getAction() == MotionEvent_.ACTION_DOWN) {
                        mx = event.getRawX();
                        my = event.getRawY();
                    } else if (event.getAction() == MotionEvent_.ACTION_MOVE) {
                        var _x = event.getRawX();
                        var _y = event.getRawY();

                        if (Math.abs(mx - _x) < 10 || Math.abs(my - _y) < 10) {
                            return false;
                        }

                        __window.update(WIDTH - _x - 20 * dp, HEIGHT - _y - 20 * dp, 45 * dp, 45 * dp);
                        _moving = true;
                    } else if (event.getAction() == MotionEvent_.ACTION_UP) {
                        if (_moving) {
                            _moving = false;
                            return true;
                        }
                        if (!_moving && event.getX() >= 0 && event.getX() <= 45 * dp && event.getY() >= 0 && event.getY() <= 45 * dp) {
                            if (edit_window == null) {
                                EditWindow();
                            }
                        }
                    }
                    return false;
                }
            });

            __window = new PopupWindow_();
            var __layout = new LinearLayout_(CONTEXT);
            __layout.addView(editButton);
            __window.setContentView(__layout);
            __window.setWidth(-2);
            __window.setHeight(-2);
            __window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.BOTTOM | Gravity_.RIGHT, 0, 0);
        });
    }



    bl.newLevel = function() {
        bl.ModPE.setItem(500, "axe", 4, "월드에딧 도구", 1);
        //월드에딧 좌표 설정을 위한 도구 정의
        bl.addItemInventory(500, 1);

        editor = new Editor(bl.Level.getWorldName());
        editor.init();
        //들어간 월드에 해당하는 에디터 로드

        if (__window == null) {
            makeEditButton();
        }
        if(taskWindow == null) {
            showTaskState();
        }
    };



    bl.leaveGame = function() {
        uiThread(function() {
            if (_window != null) {
                _window.dismiss();
                _window = null;
            }
            if (__window != null) {
                __window.dismiss();
                __window = null;
            }
            if(taskWindow != null) {
                taskWindow.dismiss();
            }
        });
        editor.saveFromDirectory();
        editor = null;
    };



    bl.useItem = function(x, y, z, itemId, blockId, side, itemData, blockData) {
        if (itemId == 500) {
            pointer = new Pointer(x, y, z);
            toast("시작 지점이 " + pointer.toString() + "으로 설정되었습니다.");
        }
    };



    bl.startDestroyBlock = function(x, y, z) {
        if (bl.Player.getCarriedItem() == 500) {
            preventDefault();
            _pointer = new Pointer(x, y, z);
            toast("종료 지점이 " + _pointer.toString() + "으로 설정되었습니다.");
        }
    };



    bl.entityAddedHook = function(ent) {
        
    };



})(this);
