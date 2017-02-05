(function (bl) {

    'use strict';

    const CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
        Button_ = android.widget.Button,
        TextView_ = android.widget.TextView,
        ToggleButton_ = android.widget.ToggleButton,
        ProgressBar_ = android.widget.ProgressBar,
        PopupWindow_ = android.widget.PopupWindow,
        Toast_ = android.widget.Toast,
        View_ = android.view.View,
        OnCheckedChangeListener_ = android.widget.CompoundButton.OnCheckedChangeListener,
        OnTouchListener_ = View_.OnTouchListener,
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
        DP = TypedValue_.applyDimension(TypedValue_.COMPLEX_UNIT_DIP, 1, CONTEXT.getResources().getDisplayMetrics()),
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
        new Thread_(new Runnable_() {
            run: function () {
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
    Time.prototype.getHour = function () {
        return this._hour;
    };

    /**
     * Get current minute.
     * @since 2016-9-10
     * @return {Number} - Current minute
     */
    Time.prototype.getMinute = function () {
        return this._minutes;
    };

    /**
     * Get current year.
     * @since 2016-9-10
     * @return {Number} - Current year
     */
    Time.prototype.getYear = function () {
        return this._year;
    };

    /**
     * Get current month.
     * @since 2016-9-10
     * @return {Number} - Current month
     */
    Time.prototype.getMonth = function () {
        return this._month;
    };

    /**
     * Get current date.
     * @since 2016-9-10
     * @return {Number} - Current date
     */
    Time.prototype.getDate = function () {
        return this._date;
    };

    /**
     * Get full time.
     * @since 2016-9-10
     * @return {String} - Full time
     */
    Time.prototype.getCurrentTime = function () {
        return this._year + "년 " + this._month + "월 " + this._day + "일 " + (this._hour > 12 ? ("오후" + (this._hour - 12)) : ("오전" + this._hour)) + ":" + this._minute;
    };



    /**
     * Save and read a data.
     * @class
     */
    function Data() {}

    /**
     * Saving data.
     * param {String} name - Data name
     * param {String} value - Data
     */
    Data.saveData = function (name, value) {
        if (new File_(DB_PATH + "Data.txt").exists()) {
            var file = new File(DB_PATH + "Data.txt");
            file.write(file.read() + "" + name + " : " + value);
        } else {
            var file = new File(DB_PATH + "Data.txt");
            file.create();
            file.write(name + " : " + value);
        }
    };

    /**
     * Reading data.
     * @param {String} name - Data name
     * @return {String} data
     */
    Data.readData = function (name) {
        try {
            var file = new File_(DB_PATH + "Data.txt"),
                br = new BufferedReader_(new FileReader_(file)),
                str, split;

            while (true) {
                str = br.readLine();
                if (str !== null) {
                    split = str.split(" : ");
                    if (split[0] == name) {
                        return split[1];
                    }
                }
            }
        } catch (err) {

        }
    };

    Data.removeData = function (name) {

    };



    function File(path) {
        this._path = path;
    }

    /**
     * Create dirctory path and a file.
     * @since 2016-9-5
     */
    File.prototype.create = function () {
        var file = new File_(this._path);

        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        if (!file.exists()) {
            file.createNewFile();
        }
        return this;
    };

    File.prototype.exists = function () {
        var file = new File_(this._path);
        return file.exists();
    }

    /**
     * Reading file.
     * @since 2016-9-5
     * @param {String} path
     * @return {String}
     */
    File.read = function (path) {
        var file = new File_(path);
        if (file.exists()) {
            var fis = new FileInputStream_(path),
                isr = new InputStreamReader_(fis),
                br = new BufferedReader_(isr),
                str = "",
                read = "";

            while ((read = br.readLine()) !== -1) {
                str += read + "\n";
            }
            br.close();

            return str;
        } else {
            return "";
        }
    };

    /**
     * Save value in the file.
     * @since 2016-9-5
     * @param {String} path
     * @param {String} content
     */
    File.write = function (path, content) {
        var file = new File_(path),
            fos = new FileOutputStream_(path);

        fos.write(new String_(content).getBytes());
        fos.close();
    };

    /**
     * Read a data from the file.
     * @since 2016-9-5
     * @return {String}
     */
    File.prototype.read = function () {
        return File.read(this._path);
    };

    /**
     * Save content in the file.
     * @since 2016-9-10
     * @param {String} content
     */
    File.prototype.write = function (content) {
        File.write(this._path, content);
        return this;
    };

    /**
     * Zip the file.
     * @since 2016-9-10
     * @param {String} path
     */
    File.prototype.zip = function (path) {
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
    File.prototype.unzip = function (path) {
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
     * @param {Number} [radius=15*DP] radius
     * @param {Number} alpha
     */
    Canvas.drawCircle = function (view, width, height, x, y, color, drawable, radius, alpha) {
        var bm = Bitmap_.createBitmap(width, height, Bitmap_.Config.ARGB_8888),
            canvas = new Canvas_(bm),
            paint = new Paint_();

        paint.setColor(color);

        if (alpha !== null) {
            paint.setAlpha(alpha);
        }

        paint.setAntiAlias(true);
        canvas.drawCircle(x, y, (radius === null ? 15 * DP : radius), paint);

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
    Drawable.setTint = function (drawable, color) {
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
        this._duration = 300;
        this._max_radius = null;
    };

    /**
     * Set the width and height of the view shown the ripple effect.
     * @since 2016-8-29
     * @param {Number} width - Width of the view
     * @param {Number} height - Height of the view
     */
    RippleDrawable.prototype.setWH = function (width, height) {
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
    RippleDrawable.prototype.setHotSpot = function (x, y) {
        this._x = x;
        this._y = y;
        return this;
    };

    /**
     * Set the ripple effect color.
     * @since 2016-8-29
     * @param {Number} color - Color of the ripple effect
     */
    RippleDrawable.prototype.setEffectColor = function (color) {
        this._effectColor = color;
        return this;
    };

    /**
     * @since 2016-8-29
     * @param {android.graphics.drawable.Drawable} drawable
     */
    RippleDrawable.prototype.setBackgroundDrawable = function (drawable) {
        this._drawable = drawable;
        return this;
    };

    /**
     * Set an event.
     * @since 2016-8-29
     * @param {Function} event
     */
    RippleDrawable.prototype.setEvent = function (event) {
        this._event = event;
        return this;
    };

    /**
     * Set duration of the effect.
     * @since 2016-8-29
     * @param {Number} duration
     */
    RippleDrawable.prototype.setDuration = function (duration) {
        this._duration = duration;
        return this;
    };

    /**
     * Set a view shown the ripple effect.
     * @since 2016-8-29
     * @param {android.view.View}
     */
    RippleDrawable.prototype.setView = function (view) {
        this._view = view;
        return this;
    };

    /**
     * Start the ripple effect.
     * @since 2016-8-29
     */
    RippleDrawable.prototype.start = function () {
        var radius = 10 * DP,
            max_radius = (this._max_radius == null ? ((Math.hypot(this._width, this._height) / 2) + 100 * DP) : this._max_radius),
            click = false;

        var valueAnimator = ValueAnimator_.ofFloat([radius, max_radius]),
            _valueAnimatorX = ValueAnimator_.ofFloat([this._x, this._width / 2]),
            _valueAnimatorY = ValueAnimator_.ofFloat([this._y, this._height / 2]);

        _valueAnimatorX.setDuration(this._duration);
        _valueAnimatorY.setDuration(this._duration);

        var thiz = this;
        valueAnimator.addUpdateListener(new ValueAnimator_.AnimatorUpdateListener({
            onAnimationUpdate: function (_valueAnimator) {
                var current_radius = _valueAnimator.getAnimatedValue(),
                    circle_point_x = _valueAnimatorX.getAnimatedValue(),
                    circle_point_y = _valueAnimatorY.getAnimatedValue();

                if (current_radius < max_radius) {
                    Canvas.drawCircle(thiz._view, thiz._width, thiz._height, circle_point_x, circle_point_y, thiz._effectColor, thiz._drawable, current_radius, null);
                }

                if (circle_point_x == thiz._width / 2) {
                    thiz._view.setBackgroundDrawable(thiz._drawable);

                    if (thiz._event != null && !click) {
                        thiz._event(thiz._view);
                    }

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

    ShadeDrawable.prototype.setDrawable = function () {

    };

    ShadeDrawable.prototype.create = function () {
        var layerDrawable = new LayerDrawable_([this.resource, new ColorDrawable_(Color_.WHITE)]);
        layerDrawable.setLayerInset(0, 3 * DP, 6 * DP, 3 * DP, 2 * DP);
        return layerDrawable;
    };



    function Button() {
        this._view = new Button_(CONTEXT);
        this._effectColor = Color_.rgb(0, 150, 255);
        this._width = 0;
        this._height = 0;
        this._drawable = null;
        this._listener = () => {};
        this._theme = new Theme();
    }

    /**
     * Set text of the Button.
     * @since 2016-8-27
     * @param {String} text - Button text
     */
    Button.prototype.setText = function (text) {
        this._view.setText(text);
        return this;
    };

    /**
     * Set a color of the shown text.
     * @since 2016-8-28
     * @param {Number} textColor - Color of the shown text
     */
    Button.prototype.setTextColor = function (textColor) {
        this._view.setTextColor(textColor);
        return this;
    };

    /**
     * Set a size of the shown text.
     * @since 2016-8-28
     * @param {Number} textSize - Size of the shown text
     */
    Button.prototype.setTextSize = function (textSize) {
        this._view.setTextSize(textSize);
        return this;
    };

    /**
     * Set the width and height of the button.
     * @since 2016-8-27
     * @param {Number} width - Width of the button
     * @param {Number} height - Height of the button
     */
    Button.prototype.setWH = function (width, height) {
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
    Button.prototype.setEffectColor = function (effectColor) {
        this._effectColor = effectColor;
        return this;
    };

    Button.prototype.setBackgroundDrawable = function (drawable) {
        this._drawable = drawable;
        return this;
    };

    /**
     * Set an click event.
     * @since 2016-8-28
     * @param {Funtion} event - Click event
     */
    Button.prototype.setEvent = function (event) {
        this._listener = event;
        return this;
    };

    Button.prototype.get = function () {
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
                        new RippleDrawable()
                            .setView(thiz._view)
                            .setWH(view.getWidth(), view.getHeight())
                            .setHotSpot(event.getX(), event.getY())
                            .setEffectColor(thiz._effectColor)
                            .setBackgroundDrawable(thiz._drawable)
                            .setEvent(thiz._listener)
                            .start();
                        return true;

                    case MotionEvent_.ACTION_CANCEL:
                        new RippleDrawable()
                            .setView(thiz._view)
                            .setWH(view.getWidth(), view.getHeight())
                            .setHotSpot(event.getX(), event.getY())
                            .setEffectColor(thiz._effectColor)
                            .setBackgroundDrawable(thiz._drawable)
                            .setEvent(thiz._listener)
                            .start();
                        return true;
                }
            }
        }));

        return this._view;
    };

    Button.prototype.show = function (gravity, x, y) {
        render(this.get(), gravity, x, y);
    };



    function CircleButton() {
        this._view = new Button_(CONTEXT);
        this._radius = 50 * DP;
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
    CircleButton.prototype.setText = function (str) {
        this._view.setText(str);
        return this;
    };

    CircleButton.prototype.setTextSize = function (size) {
        this._view.setTextSize(size);
        return this;
    };

    CircleButton.prototype.setTextColor = function (color) {
        this._view.setTextColor(color);
        return this;
    };

    CircleButton.prototype.setRadius = function (radius) {
        this._radius = radius;
        this._view.setLayoutParams(new Params_(this._radius * 2, this._radius * 2));
        return this;
    };

    CircleButton.prototype.setColor = function (color) {
        this._color = color;
        return this;
    };

    CircleButton.prototype.setBackgroundDrawable = function (__drawable) {
        this.drawable = __drawable;
        if (this._shapeDrawable != null) {
            this._drawable = new LayerDrawable_([this._shapeDrawable, this.drawable]);
            this._view.setBackgroundDrawable(this._drawable);
        }
        return this;
    };

    CircleButton.prototype.setEffectColor = function (color) {
        this._effectColor = color;
        return this;
    };

    CircleButton.prototype.setEvent = function (__listener) {
        this._listener = __listener;
        return this;
    };

    CircleButton.prototype.get = function () {
        this._shapeDrawable = drawable_.ShapeDrawable(new drawable_.shapes.OvalShape());
        this._shapeDrawable.getPaint().setColor(this._color);

        if (this.drawable == null) this._drawable = this._shapeDrawable;
        else this._drawable = new LayerDrawable_([this._shapeDrawable, this.drawable]);

        var thiz = this;
        this._view.setAllCaps(false);
        this._view.setBackgroundDrawable(this._drawable);
        this._view.setOnTouchListener(new OnTouchListener_({
            onTouch: function (view, event) {
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

    CircleButton.prototype.show = function (gravity, x, y) {
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

    CheckBox.prototype.setText = function (str) {
        this._textView.setText(str);
        return this;
    };

    CheckBox.prototype.setTextSize = function (size) {
        this._textView.setTextSize(size);
        return this;
    };

    CheckBox.prototype.setTextColor = function (color) {
        this._textView.setTextColor(color);
        return this;
    };

    CheckBox.prototype.setChecked = function (checked) {
        var thiz = this;
        uiThread(() => {
            thiz._checked = checked;
            thiz._view.setChecked(thiz._checked);
        });
        return this;
    };

    CheckBox.prototype.setColor = function (color) {
        this._color = color;
        return this;
    };

    CheckBox.prototype.setParams = function (width, height) {
        this._WIDTH = width;
        this._HEIGHT = height;
        this._viewLayout.setLayoutParams(new Params_(this.WIDTH, this.HEIGHT));
        return this;
    };

    CheckBox.prototype.setOnCheckedChangeListener = function (__listener) {
        this._listener = __listener;
        return this;
    };

    CheckBox.prototype.getWidth = function () {
        return this._WIDTH;
    };

    CheckBox.prototype.getHeight = function () {
        return this._HEIGHT;
    };

    CheckBox.prototype.get = function () {
        var thiz = this;
        this._view.setBackgroundDrawable(es.astin.graphics.drawable.CHECKBOX_OFF(this._color));
        this._view.setLayoutParams(new Params_(30 * DP, 30 * DP));
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

        this._textView.setLayoutParams(new Params_(this._WIDTH - 35 * DP, this._HEIGHT));
        this._viewLayout.addView(this._textView);

        return this._viewLayout;
    };

    CheckBox.prototype.show = function (gravity, x, y) {
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

    RadioButton.prototype.setText = function (str) {
        this._textView.setText(str);
        return this;
    };

    RadioButton.prototype.setTextSize = function (size) {
        this._textView.setTextSize(size);
        return this;
    };

    RadioButton.prototype.setTextColor = function (color) {
        this._textView.setTextColor(color);
        return this;
    };

    RadioButton.prototype.setChecked = function (checked) {
        var thiz = this;
        uiThread(() => {
            thiz._checked = checked;
            thiz._view.setChecked(thiz._checked);
        });
        return this;
    };

    RadioButton.prototype.setColor = function (color) {
        this._color = color;
        return this;
    };

    RadioButton.prototype.setParams = function (width, height) {
        this._WIDTH = width;
        this._HEIGHT = height;
        this._viewLayout.setLayoutParams(new Params_(this.WIDTH, this.HEIGHT));
        return this;
    };

    RadioButton.prototype.setOnCheckedChangeListener = function (__listener) {
        this._listener = __listener;
        return this;
    };

    RadioButton.prototype.getWidth = function () {
        return this._WIDTH;
    };

    RadioButton.prototype.getHeight = function () {
        return this._HEIGHT;
    };

    RadioButton.prototype.get = function () {
        var thiz = this;
        this._view.setBackgroundDrawable(es.astin.graphics.drawable.RADIO_OFF(this._color));
        this._view.setLayoutParams(new Params_(30 * DP, 30 * DP));
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

        this._textView.setLayoutParams(new Params_(this._WIDTH - 35 * DP, this._HEIGHT));
        this._viewLayout.addView(this._textView);

        return this._viewLayout;
    };

    RadioButton.prototype.show = function (gravity, x, y) {
        render(this.get(), gravity, x, y);
    };



    function Space() {
        this._Space = new TextView_(CONTEXT);
        this._Space.setBackgroundDrawable(null);
    }

    Space.prototype.setWH = function (w, h) {
        this._Space.setLayoutParams(new Params_(w, h));
        return this;
    };

    Space.prototype.get = function () {
        return this._Space;
    };



    function Divider() {
        this._view = new TextView_(CONTEXT);
    }

    Divider.prototype.setWH = function (w, h) {
        this._view.setLayoutParams(new Params_(w, h));
        return this;
    };

    Divider.prototype.setColor = function (color) {
        this._view.setBackgroundDrawable(new ColorDrawable_(color));
        return this;
    };

    Divider.prototype.get = function () {
        return this._view;
    };



    function PopupWindow() {
        this.window = new PopupWindow_();
        this.mainLayout = new LinearLayout_(CONTEXT);
        this.titleLayout = new LinearLayout_(CONTEXT);

        this.dismissListener = function () {};
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        var that = this;

        this.mainLayout.setOrientation(1);
        this.titleLayout.setOrientation(0);

        this.mainLayout.setGravity(Gravity_.TOP | Gravity_.CENTER);
        this.titleLayout.setGravity(Gravity_.LEFT | Gravity_.CENTER);
        this.mainLayout.setBackgroundColor(Color_.WHITE);
        this.titleLayout.setBackgroundColor(Color_.rgb(30, 30, 30));

        var layer = new LayerDrawable_([Drawable.MENU(Color.WHITE)]);
        layer.setLayerInset(0, 3 * DP, 3 * DP, 3 * DP, 3 * DP);
        this.titleLayout.addView(new Space().setWH(10 * DP, 1).get());
        this.menuBtn = new Button()
            .setText("")
            .setTextColor(Color_.WHITE)
            .setWH(20 * DP, 20 * DP)
            .setEffectColor(Color_.argb(0, 0, 0, 0))
            .setBackgroundDrawable(layer)
            .setEvent(function (view) {

            });
        this.titleLayout.addView(this.menuBtn.get());

        this.titleLayout.addView(new Space().setWH(10 * DP, 1).get());
        this.title = new TextView_(CONTEXT);
        this.title.setText("Title");
        this.title.setTextColor(Color_.WHITE);
        this.title.setGravity(Gravity_.LEFT | Gravity_.CENTER);
        this.titleLayout.addView(this.title, WIDTH - 70 * DP, 45 * DP);

        this.close = new Button()
            .setText("")
            .setWH(20 * DP, 20 * DP)
            .setEffectColor(Color_.argb(0, 0, 0, 0))
            .setBackgroundDrawable(Drawable.CLOSE(Color.WHITE))
            .setEvent(function (view) {
                uiThread(function () {
                    that.window.dismiss();
                    that.dismissListener();
                });
            });
        this.titleLayout.addView(this.close.get());
        this.mainLayout.addView(this.titleLayout, -1, 45 * DP);
    }

    PopupWindow.prototype.setTitle = function (str) {
        this.title.setText(str);
        return this;
    };

    PopupWindow.prototype.setTitleColor = function (color) {
        this.titleLayout.setBackgroundDrawable(new ColorDrawable(color));
        return this;
    };

    PopupWindow.prototype.setOnDismissListener = function (listener) {
        this.dismissListener = listener;
        return this;
    };

    PopupWindow.prototype.setIcon = function (icon) {
        this.menuBtn.setBackgroundDrawable(icon);
        return this;
    };

    PopupWindow.prototype.setWidth = function (value) {
        this.WIDTH = value;
        return this;
    };

    PopupWindow.prototype.setHeight = function (value) {
        this.HEIGHT = value;
        return this;
    };

    PopupWindow.prototype.setContentView = function (view) {
        this.mainLayout.addView(view);
        return this;
    };

    PopupWindow.prototype.show = function () {
        var that = this;
        uiThread(function () {
            that.window.setWidth(that.WIDTH);
            that.window.setHeight(that.HEIGHT);
            that.window.setContentView(that.mainLayout);
            that.window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.CENTER, 0, 0);
        });
    };



    function Dialog() {

    }



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

    ImageButton.prototype.setText = function (text) {

    };



    function Widget() {}

    Widget.TextView = function (text, textColor, textSize, width, height, drawable) {
        var tv = new TextView_(CONTEXT);
        tv.setText(text);
        if (textColor != null) tv.setTextColor(textColor);
        if (textSize != null) tv.setTextSize(textSize);
        if (drawable != null) tv.setBackgroundDrawable(drawable);
        tv.setLayoutParams(new Params_(width, height));

        return tv;
    };

    Widget.Button = function (text, textColor, textSize, width, height, drawable) {
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
    ScriptInfo.prototype.setVersion = function (ver) {
        this._version = ver;
        return this;
    };

    /**
     * Set a developer of the script.
     * @since 2016-8-28
     * @param {String} name - Developer name
     * @param {String} email - Developer E-mail
     */
    ScriptInfo.prototype.setDeveloper = function (name, email) {
        this._developer = [name, email];
        return this;
    };

    /**
     * Set the github url of the script
     * @since 2016-8-28
     * @param {String} url - Github url of the script
     */
    ScriptInfo.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    /**
     * Set the path of the script
     * @since 2016-8-28
     * @param {String} path - directory path of the script
     */
    ScriptInfo.prototype.setPath = function (path) {
        this._path = path;
        return this;
    };

    ScriptInfo.prototype.getVersion = function () {
        return this._version;
    };

    ScriptInfo.prototype.getPath = function () {
        return this._path;
    };

    ScriptInfo.prototype.getUrl = function () {
        return this._url;
    };

    ScriptInfo.prototype.getDeveloper = function () {
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
    NetworkChecker.prototype.getConnectedType = function () {
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
    NetworkChecker.prototype.isConnected = function () {
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
    DownloadManager.prototype.setInfo = function (info) {
        this._info = info;
        return this;
    };

    DownloadManager.prototype.setProgressBar = function () {

    };

    DownloadManager.prototype.getProgress = function () {

    };

    DownloadManager.prototype.start = function () {
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
            return String(read.toString());
        } catch (err) {
            error(err);
        }
    }



    function toast(text, duration) {
        uiThread(function () {
            Toast_.makeText(CONTEXT, text, (duration == null ? Toast_.LENGTH_SHORT : duration)).show();
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

    Vector3.prototype.getDistance = function (x, y, z) {
        if (x instanceof Vector3) {
            return Math.sqrt(Math.pow(x.x - this.x, 2) + Math.pow(x.y - this.y, 2) + Math.pow(x.z - this.z, 2));
        }
        if (typeof x == "number") {
            return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) + Math.pow(z - this.z, 2));
        }
    };

    Vector3.prototype.add = function (x, y, z) {
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

    Vector3.prototype.set = function (x, y, z) {
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

    Vector3.prototype.toArray = function () {
        return [this.x, this.y, this.z];
    };

    Vector3.prototype.toString = function () {
        return "[ " + this.toArray().join(", ") + " ]";
    };



    function getEditVector(p1, p2) { //지형 스캔시 사용할 벡터 및 두 포인터 사이 거리를 반환합니다
        var start = [],
            end = [];

        p1.getLocation(start);
        p2.getLocation(end);
        //두 포인터의 좌표를 받아옵니다

        return {
            start: new Vector3(Math.min(start[0], end[0]), Math.min(start[1], end[1]), Math.min(start[2], end[2])),
            end: new Vector3(Math.max(start[0], end[0]), Math.max(start[1], end[1]), Math.max(start[2], end[2])),
            dx: Math.abs(start[0] - end[0]),
            dy: Math.abs(start[1] - end[1]),
            dz: Math.abs(start[2] - end[2])
        };
    }



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

    Pointer.prototype.set = function (x, y, z) {
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

    Pointer.prototype.getLocation = function (array) {
        array = [this.x, this.y, this.z];
    };

    Pointer.prototype.getX = function () {
        return this.x;
    };

    Pointer.prototype.getY = function () {
        return this.y;
    };

    Pointer.prototype.getZ = function () {
        return this.z;
    };

    Pointer.prototype.toString = function () {
        return "[ " + ([this.x, this.y, this.z]).join(", ") + " ]";
    };



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

    Block.prototype.getBlockData = function (array) {
        array = [this.x, this.y, this.z, this.id, this.data];
    };

    Block.prototype.getX = function () {
        return this.x;
    };

    Block.prototype.getY = function () {
        return this.y;
    };

    Block.prototype.getZ = function () {
        return this.z;
    };

    Block.prototype.getId = function () {
        return this.id;
    };

    Block.prototype.getData = function () {
        return this.data;
    };

    Block.prototype.set = function () {
        bl.Level.setTile(this.x, this.y, this.z, this.id, this.data);
    };

    Block.prototype.update = function (x, y, z, id, data) {
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

    Block.prototype.getVector = function () {
        return new Vector3(this.x, this.y, this.z);
    }

    Block.prototype.rotate = function () { //지형 회전시 계단의 블록 데이터를 회전시켜줍니다
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

    Block.prototype.flip = function () {

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
            FLIP: 13
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
    Object.freeze(EditTypes);
    
    const RenderTypes = {
        CUBE: 0,
        CIRCLE: 1,
        SPHERE: 2,
        CYLINDER: 3
    };
    Object.freeze(RenderTypes);

    function Editor(name) {
        this._worldName = name;
        this._taskList = [];
        this._copiedBlock = [];
        this._savedBlock = [];
        this._editedBlock = [];
        this._taskCount = 0;
        this._editCount = 0;
        this.__editCount = 0;
        this._editable = false;
        this._paste = false;

        var path = DB_PATH + "/world edit/" + name,
            file = new File(path);

        if (file.exists()) {
            
        }
    }

    Editor.prototype.render = function (p1, p2, type, task, data) {
        var thiz = this;
        if (this._paste) { //붙여넣기 작업이 진행중이면
            toast("붙여넣기 모드가 활성화 되어있습니다.\n붙여넣기 작업을 먼저 마친 후에 시도하세요.");
        }

        this._savedBlock[this._taskCount] = [];
        //스캔한 블럭을 담을 배열 생성
        switch(type) {
            case RenderTypes.CUBE:
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                new Thread_(new Runnable_() {
                    run: function () {
                        var editVector = getEditVector(p1, p2);

                        for (var dx = 0; dx < editVector.dx; dx++) { //x 변화량
                            for (var dy = 0; dy < editVector.dy; dy++) { //y 변화량
                                for (var dz = 0; dz < editVector.dz; dz++) { //z 변화량
                                    thiz._savedBlock[thiz._taskCount].push(new Block(editVector.start.getX() + dx, editVector.start.getY() + dy, editVector.start.getZ() + dz)); //스캔한 블럭을 스캔한 지형 배열에 추가
                                    thiz._editCount++; //스캔한 블록의 수
                                    Thread_.sleep(50);
                                }
                            }
                        }

                        if (thiz._editCount === editVector.dx * editVector.dy * editVectory.dz) { //스캔한 블록의 수가 지정한 범위 안의 블록 수와 일치할 때
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;
                    
            case RenderTypes.CIRCLE: //data = [반지름, 속 비우기 여부, 블록 아이디, 블록 데이터]
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                new Thread_(new Runnable_() {
                    run: function () {
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
                                Thread_.sleep(50);
                            }
                        }

                        if(thiz.__editCount == Math.pow((2 * radius) - 1), 2)) {
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;
                 
            case RenderTypes.SPHERE: //data = [반지름, 속 비우기 여부, 블록 아이디, 블록 데이터]
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                new Thread_(new Runnable_() {
                    run: function () {
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
                                    Thread_.sleep(50);
                                }
                            }
                        }
                        
                        if(thiz.__editCount == Math.pow((2 * radius) - 1), 3)) {
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;
                
            case RenderTypes.CYLINDER: //data = [반지름, 속 비우기 여부, 높이, 블록 아이디, 블록 데이터]
                toast("지형을 탐색합니다. 잠시만 기다려주세요....");
                new Thread_(new Runnable_() {
                    run: function () {
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
                                        thiz._savedBlock[thiz._taskCount].push(new Block(p1.getX() + dx, p1.getY(), p1.getZ() + dz)); //스캔한 블럭을 스캔한 지형 배열에 추가
                                        thiz._editCount++;
                                    }
                                }
                                Thread_.sleep(50);
                            }
                        }

                        if(thiz.__editCount == ((Math.pow((2 * radius) - 1), 2)) * height)) {
                            thiz._editable = true; //작업 준비 완료
                            toast("지형 탐색이 완료되었습니다.\n" + thiz._editCount + "개의 블록들이 수정될 준비를 마쳤습니다.");
                            thiz.request(EditTypes.terrain.TYPE, task, data); //작업 요청
                        }
                    }
                }).start();
                break;
        }
    };

    Editor.prototype.request = function (type, task, data) {
        if (type === EditTypes.terrain.TYPE) { //지형 작업 요청
            if (this._paste) { //붙여넣기 작업이 진행중인 경우
                toast("붙여넣기 모드가 활성화 되어있습니다.\n붙여넣기 작업을 먼저 마친 후에 시도하세요.");
                return;
            }

            const thiz = this;
            switch (task) {
                case EditTypes.terrain.FILL: //data = [채울 블록 아이디, 채울 블록 데이터]
                    this._editedBlock[this._taskCount] = []; //수정한 지형을 담을 배열 생성
                    thread(function () {
                        for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                            var block = thiz._savedBlock[thiz._taskCount][i]; //기존 블록 정보
                            var _block = new Block(block.getVector(), data[0], data[1]); //채워질 블록 정보
                            _block.set(); //블록 설치
                            thiz._editedBlock[thiz._taskCount][i].push(_block); //설치한 블록을 수정한 지형 배열에 추가
                        }
                    }, 50);

                    this._taskList.push({ //작업 리스트에 추가
                        type: EditTypes.terrain.FILL,
                        count: this._editCount,
                        content: "id: " + data[0] + ", data: " + data[1] + "로 채우기"
                    });
                    this._taskCount++; //작업한 수 증가
                    this._editCount = 0; //작업한 블록 수 초기화
                    this._editable = false; //작업 종료
                    break;

                case EditTypes.terrain.CHANGE: //data = [바꿔질 블록 아이디, 바꿔질 블록 데이터, 바꾼 후의 블록 아이디, 바꾼 후의 블록 데이터]
                    this._editedBlock[this._taskCount] = []; //수정한 지형을 담을 배열 생성
                    thread(function () {
                        for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                            var block = thiz._savedBlock[thiz._taskCount][i]; //바뀌기 전 블록 정보
                            if (block.getId() === data[0] && block.getData() === data[1]) { //만약 바꿔질 블록 정보가 data의 정보랑 같다면
                                var _block = new Block(block.getVector(), data[2], data[3]); //바뀐 후의 블록 정보
                                _block.set(); //블록 설치
                                thiz._editedBlock[thiz._taskCount].push(_block); //설치한 블록을 수정한 지형 배열에 추가
                            }
                        }
                    }, 50);

                    this._taskList.push({ //작업 리스트에 추가
                        type: EditTypes.terrain.CHANGE,
                        count: this._editCount,
                        content: "id: " + data[0] + ", data: " + data[1] + "을 id: " + data[2] + ", data: " + data[3] + "으로 바꾸기"
                    });
                    this._taskCount++; //작업한 수 증가
                    this._editCount = 0; //작업한 블록 수 초기화
                    this._editable = false; //작업 종료
                    break;

                case EditTypes.terrain.COPY:
                    this._copiedBlock = this._savedBlock[this._taskCount]; //복사한 지형 = 스캔한 지형

                    this._taskList.push({
                        type: EditTypes.terrain.COPY,
                        count: this._editCount,
                        content: this._editCount + "개의 블록을 복사함"
                    });
                    this.paste = true;
                    this._editCount = 0;
                    break;

                case EditTypes.terrain.COVER: //data = [덮을 블록 아이디, 덮을 블록 데이터]
                    this._editedBlock[this._taskCount] = []; //수정한 지형을 담을 배열 생성
                    thread(function () {
                        for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                            var block = thiz._savedBlock[thiz._taskCount][i];
                            if (bl.Level.getTile(block.getX(), block.getY() + 1, block.getZ()) === 0) { //만약 블록의 위가 공기일 때
                                var _block = new Block(block.getX(), block.getY() + 1, block.getZ(), data[0], data[1]); //덮을 블록 정보
                                _block.set(); //덮을 블록 설치
                                thiz._editedBlock[thiz._taskCount].push(_block); //덮은 블록을 수정한 지형 배열에 추가
                            }
                        }
                    }, 50);

                    this._taskList.push({ //작업 리스트에 추가
                        type: EditTypes.terrain.COVER,
                        count: this._editCount,
                        content: "id: " + data[0] + ", data: " + data[1] + "으로 덮기"
                    });
                    this._taskCount++; //작업한 수 증가
                    this._editCount = 0; //작업한 블록 수 초기화
                    this._editable = false; //작업 종료
                    break;

                case EditTypes.terrain.WALL: //data = [벽 블록 아이디, 벽 블록 데이터]
                    var array_map_x = this._savedBlock[this._taskCount].map(function (i) {
                        return i.getX();
                    }); //스캔한 블럭의 x좌표 값
                    var array_map_z = this._savedBlock[this._taskCount].map(function (i) {
                        return i.getZ();
                    }); //스캔한 블럭의 z좌표 값

                    var x = [Math.max.apply(null, array_map_x), Math.min.apply(null, array_map_x)], //x좌표 값의 최대, 최소
                        z = [Math.max.apply(null, array_map_z), Math.min.apply(null, array_map_z)]; //z좌쵸 값의 최대, 최소
                    this._editedBlock[this._taskCount] = []; //수정한 지형을 담을 배열 생성
                    thread(function () {
                        for (var i = 0, len = thiz._savedBlock[thiz._taskCount].length; i < len; i++) {
                            var block = thiz._savedBlock[thiz._taskCount][i]; //기존 블록 정보
                            if (block.getX() === x[0] || block.getX() === x[1] || block.getZ() === z[0] || block.getZ() === z[1]) { //만약 기존 블록의 x or z 좌표가 최대 혹은 최소일 경우
                                var _block = new Block(block.getVector(), data[0], data[1]); //벽 블록 정보
                                _block.set(); //블록 설치
                                thiz._editedBlock[thiz._taskCount].push(_block); //벽 블록 정보를 수정한 지형 배열에 추가
                            }
                        }
                    }, 50);

                    this._taskList.push({ //작업 리스트에 추가
                        type: EditTypes.terrain.WALL,
                        count: this._editCount,
                        content: "id: " + data[0] + ", data: " + data[1] + "로 벽 만들기"
                    });
                    this._taskCount++; //작업한 수 증가
                    this._editCount = 0; //작업한 블록 수 초기화
                    this._editable = false; //작업 종료
                    break;
                    
                case EdiTypes.terrain.CIRCLE:
                    
                    break;
            }
        }

        if (type === EditTypes.server.TYPE) { //서버 작업 요청

        }
    };

    Editor.prototype.saveFromDirectory = function () {
        
    };




    var fButton, //메뉴 버튼
        editButton,
        _window,
        __window,
        editor;

    var pointer, _pointer; //월드 에딧 포인터

    var x, y, mx, my,
        moving = false,
        _moving = false;


    function makeEditButton() {
        uiThread(function () {
            var gradient = new GradientDrawable_();
            gradient.setCornerRadius(900 * DP);
            gradient.setColor(Color.RED);
            gradient.setStroke(3 * DP, Color.RED_ACCENT);
            var layer = new LayerDrawable_([gradient, Drawable.EDIT(Color.WHITE)]);
            layer.setLayerInset(1, 10 * DP, 10 * DP, 10 * DP, 10 * DP);

            editButton = new Button_(CONTEXT);
            editButton.setText("");
            editButton.setBackgroundDrawable(layer);
            editButton.setLayoutParams(new Params_(45 * DP, 45 * DP));
            editButton.setOnTouchListener(new OnTouchListener_() {
                onTouch: function (view, event) {
                    if (event.getAction() == MotionEvent_.ACTION_DOWN) {
                        mx = event.getRawX();
                        my = event.getRawY();
                    } else if (event.getAction() == MotionEvent_.ACTION_MOVE) {
                        var _x = event.getRawX();
                        var _y = event.getRawY();

                        if (Math.abs(mx - _x) < 10 || Math.abs(my - _y) < 10) {
                            return false;
                        }
       
                        __window.update(WIDTH - _x, HEIGHT - _y, 45 * DP, 45 * DP);
                        _moving = true;
                    } else if (event.getAction() == MotionEvent_.ACTION_UP) {
                        if (_moving) {
                            return true;
                            _moving = false;
                        }
                        if (!_moving && event.getX() >= 0 && event.getX() <= 45 * DP && event.getY() >= 0 && event.getY() <= 45 * DP) {

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
            __window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.BOTTOM | Gravity_.RIGHT, 0, 50 * DP);
        });
    }



    bl.newLevel = function () {
        bl.ModPE.setItem(500, "axe", 4, "월드에딧 도구", 1);
        //월드에딧 좌표 설정을 위한 도구 정의
        bl.addItemInventory(500, 1);

        editor = new Editor(bl.Level.getWorldName());
        //들어간 월드에 해당하는 에디터 로드

        //메인 버튼 생성
        uiThread(function () {
            var gradient = new GradientDrawable_();
            gradient.setCornerRadius(900 * DP);
            gradient.setColor(Color_.rgb(90, 110, 255));
            gradient.setStroke(3 * DP, Color_.rgb(70, 90, 255));
            var layer = new LayerDrawable_([gradient, Drawable.MENU(Color.WHITE)]);
            layer.setLayerInset(1, 13 * DP, 10 * DP, 13 * DP, 10 * DP);

            fButton = new Button_(CONTEXT);
            fButton.setText("");
            fButton.setBackgroundDrawable(layer);
            fButton.setLayoutParams(new Params_(45 * DP, 45 * DP));
            fButton.setOnTouchListener(new OnTouchListener_() {
                onTouch: function (view, event) {
                    if (event.getAction() == MotionEvent_.ACTION_DOWN) {
                        x = event.getRawX();
                        y = event.getRawY();
                    } else if (event.getAction() == MotionEvent_.ACTION_MOVE) {
                        var _x = event.getRawX();
                        var _y = event.getRawY();

                        if (Math.abs(x - _x) < 10 || Math.abs(y - _y) < 10) {
                            return false;
                        }

                        _window.update(WIDTH - _x, HEIGHT - _y, 45 * DP, 45 * DP);
                        moving = true;
                    } else if (event.getAction() == MotionEvent_.ACTION_UP) {
                        if (moving) {
                            return true;
                        }
                        if (!moving && event.getX() >= 0 && event.getX() <= 45 * DP && event.getY() >= 0 && event.getY() <= 45 * DP) {

                        }
                    }
                    return false;
                }
            });

            _window = new PopupWindow_();
            var _layout = new LinearLayout_(CONTEXT);
            _layout.addView(fButton);
            _window.setContentView(_layout);
            _window.setWidth(-2);
            _window.setHeight(-2);
            _window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.BOTTOM | Gravity_.RIGHT, 0, 0);
        });
    };



    bl.leaveGame = function () {
        uiThread(function () {
            if (_window != null) {
                _window.dismiss();
                _window = null;
            }
            if (__window != null) {
                __window.dismiss();
                __window = null;
            }
        });
        editor.saveFromDirectory();
        editor = null;
    };



    bl.useItem = function (x, y, z, itemId, blockId, side, itemData, blockData) {
        if (itemId == 500) {
            pointer = new Pointer(x, y, z);
            toast("시작 지점이 " + pointer.toString() + "으로 설정되었습니다.");

            if (__window == null) {
                makeEditButton();
            }
        }
    }



    bl.startDestroyBlock = function (x, y, z) {
        if (bl.Player.getCarriedItem() == 500) {
            preventDefault();
            _pointer = new Pointer(x, y, z);
            toast("종료 지점이 " + _pointer.toString() + "으로 설정되었습니다.");
        }
    }


})(this);
