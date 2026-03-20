<script>
    import { ToolLayout, ToolSection, ToolButton, ToolInput, ToolSelect } from '$components/tools';

    let age = $state(25);
    let gender = $state('male');
    let weight = $state(70);
    let height = $state(170);
    let bfp = $state('');
    let activity = $state(1.55);
    
    // Tab State: 'maintenance', 'cutting', 'bulking'
    let activeGoal = $state('maintenance');

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    const activityOptions = [
        { value: 1.2, label: 'Sedentary (Little to no exercise)' },
        { value: 1.375, label: 'Lightly Active (1-3 days/week)' },
        { value: 1.55, label: 'Moderately Active (3-5 days/week)' },
        { value: 1.725, label: 'Very Active (6-7 days/week)' },
        { value: 1.9, label: 'Athlete (2x/day training)' }
    ];

    let lbm = $derived(bfp ? weight * (1 - (bfp / 100)) : null);

    let bmr = $derived.by(() => {
        let result = 0;
        if (bfp && lbm) {
            result = 370 + (21.6 * lbm);
        } else {
            if (gender === 'male') {
                result = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                result = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
        }
        return Math.round(result);
    });

    let tdee = $derived(Math.round(bmr * activity));

    let bmi = $derived((weight / ((height / 100) ** 2)).toFixed(1));
    let bmiCategory = $derived.by(() => {
        const val = parseFloat(bmi);
        if (val < 18.5) return 'Underweight';
        if (val >= 18.5 && val < 25) return 'Normal weight';
        if (val >= 25 && val < 30) return 'Overweight';
        return 'Obesity';
    });

    let targetCalories = $derived.by(() => {
        if (activeGoal === 'cutting') return tdee - 500;
        if (activeGoal === 'bulking') return tdee + 500;
        return tdee;
    });

    function getMacros(calories, pPct, fPct, cPct) {
        return {
            protein: Math.round((calories * (pPct/100)) / 4),
            fat: Math.round((calories * (fPct/100)) / 9),
            carbs: Math.round((calories * (cPct/100)) / 4)
        };
    }

    let moderateCarb = $derived(getMacros(targetCalories, 30, 35, 35));
    let lowerCarb = $derived(getMacros(targetCalories, 40, 40, 20));
    let higherCarb = $derived(getMacros(targetCalories, 30, 20, 50));

    import foodsData from '$data/tdee-foods.json';
    const meals = foodsData.indonesian;
    const proteins = foodsData.proteins;

</script>

<ToolLayout
    title="TDEE & Macro Calculator"
    description="Calculate your Total Daily Energy Expenditure (TDEE) and optimal macronutrient targets for cutting, bulking, or maintenance."
    icon="fa-solid fa-fire"
>
    <!-- Inputs Section -->
    <ToolSection title="Your Details">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ToolSelect bind:value={gender} label="Gender" options={genderOptions} />
            <ToolInput type="number" bind:value={age} label="Age (years)" min="10" max="100" />
            <ToolInput type="number" bind:value={weight} label="Weight (kg)" min="30" max="300" step="0.1" />
            <ToolInput type="number" bind:value={height} label="Height (cm)" min="100" max="250" step="0.1" />
            <ToolInput type="number" bind:value={bfp} label="Body Fat % (Optional)" min="1" max="60" step="0.1" placeholder="Empty = Mifflin-St Jeor" />
            <div class="sm:col-span-2 lg:col-span-1">
                <ToolSelect bind:value={activity} label="Activity Level" options={activityOptions} />
            </div>
        </div>
        {#if bfp}
            <div class="mt-3 text-sm text-[var(--accent)] flex items-center gap-2">
                <i class="fa-solid fa-check-circle"></i>
                Using Katch-McArdle equation for enhanced precision based on your Lean Body Mass.
            </div>
        {/if}
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="text-[var(--accent)] font-semibold font-mono text-center bmr-banner">
                Estimated BMR: {bmr} kcal/day
            </div>
            <div class="text-[var(--accent)] font-semibold font-mono text-center bmr-banner">
                BMI: {bmi} ({bmiCategory})
            </div>
        </div>
    </ToolSection>

    <!-- Macronutrients Section -->
    <ToolSection title="Macronutrients">
        <div class="tabs-container">
            <button class="tab-btn {activeGoal === 'maintenance' ? 'active' : ''}" onclick={() => activeGoal = 'maintenance'}>
                Maintenance
            </button>
            <button class="tab-btn {activeGoal === 'cutting' ? 'active' : ''}" onclick={() => activeGoal = 'cutting'}>
                Cutting <span class="tab-badge">-500</span>
            </button>
            <button class="tab-btn {activeGoal === 'bulking' ? 'active' : ''}" onclick={() => activeGoal = 'bulking'}>
                Bulking <span class="tab-badge add">+500</span>
            </button>
        </div>

        <p class="macro-desc">
            These macronutrient values reflect your <strong>{activeGoal}</strong> calories of <strong class="text-[var(--accent)] text-lg">{targetCalories.toLocaleString()}</strong> calories per day.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <!-- Moderate Carb -->
            <div class="macro-card">
                <div class="macro-header moderate">Moderate Carb (30/35/35)</div>
                <div class="macro-body">
                    <div class="macro-row">
                        <span class="val">{moderateCarb.protein}g</span>
                        <span class="label">protein</span>
                    </div>
                    <div class="macro-row">
                        <span class="val">{moderateCarb.fat}g</span>
                        <span class="label">fats</span>
                    </div>
                    <div class="macro-row mb-0">
                        <span class="val">{moderateCarb.carbs}g</span>
                        <span class="label">carbs</span>
                    </div>
                </div>
            </div>

            <!-- Lower Carb -->
            <div class="macro-card">
                <div class="macro-header lower">Lower Carb (40/40/20)</div>
                <div class="macro-body">
                    <div class="macro-row">
                        <span class="val">{lowerCarb.protein}g</span>
                        <span class="label">protein</span>
                    </div>
                    <div class="macro-row">
                        <span class="val">{lowerCarb.fat}g</span>
                        <span class="label">fats</span>
                    </div>
                    <div class="macro-row mb-0">
                        <span class="val">{lowerCarb.carbs}g</span>
                        <span class="label">carbs</span>
                    </div>
                </div>
            </div>

            <!-- Higher Carb -->
            <div class="macro-card">
                <div class="macro-header higher">Higher Carb (30/20/50)</div>
                <div class="macro-body">
                    <div class="macro-row">
                        <span class="val">{higherCarb.protein}g</span>
                        <span class="label">protein</span>
                    </div>
                    <div class="macro-row">
                        <span class="val">{higherCarb.fat}g</span>
                        <span class="label">fats</span>
                    </div>
                    <div class="macro-row mb-0">
                        <span class="val">{higherCarb.carbs}g</span>
                        <span class="label">carbs</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-sm text-center text-[var(--text-muted)] mt-5 italic">
            There are 4 calories per gram of both protein and carbohydrates, and 9 calories per gram of fats.
        </p>
    </ToolSection>

    <!-- Practical Food Examples via dynamic JSON -->
    <ToolSection title="Main Protein Sources">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {#each proteins as pfood}
                <div class="food-card">
                    <div class="img-wrapper">
                        <img src={pfood.img} alt={pfood.name} loading="lazy" />
                    </div>
                    <div class="food-info">
                        <h5>{pfood.name}</h5>
                        <span class="food-cal">{pfood.cal} kcal</span>
                        <div class="food-tags">
                            <span class="badge p">{pfood.p}g P</span>
                            <span class="badge f">{pfood.f}g F</span>
                            <span class="badge c">{pfood.c}g C</span>
                        </div>
                        <div class="mt-2 text-xs font-semibold text-[var(--accent)]">{pfood.tag}</div>
                    </div>
                </div>
            {/each}
        </div>
    </ToolSection>

    <ToolSection title="Common Meals">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {#each meals as food}
                <div class="food-card">
                    <div class="img-wrapper">
                        <img src={food.img} alt={food.name} loading="lazy" />
                    </div>
                    <div class="food-info">
                        <h5>{food.name}</h5>
                        <span class="food-cal">{food.cal} kcal</span>
                        <div class="food-tags">
                            <span class="badge p">{food.p}g P</span>
                            <span class="badge f">{food.f}g F</span>
                            <span class="badge c">{food.c}g C</span>
                        </div>
                        <div class="mt-2 text-xs font-semibold text-[var(--accent)]">{food.tag}</div>
                    </div>
                </div>
            {/each}
        </div>
    </ToolSection>

    <!-- Educational Info -->
    <ToolSection title="Understanding Your Metrics">
        <div class="space-y-6 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
            <div>
                <h4 class="text-[var(--text-primary)] font-semibold mb-1">Basal Metabolic Rate (BMR)</h4>
                <p>Your BMR is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions if you rested all day. We use the <strong>Mifflin-St Jeor</strong> equation by default, or the <strong>Katch-McArdle</strong> formula if you provide your Body Fat Percentage.</p>
            </div>
            <div>
                <h4 class="text-[var(--text-primary)] font-semibold mb-1">Total Daily Energy Expenditure (TDEE)</h4>
                <p>Your TDEE is an estimation of how many calories you burn per day when exercise and daily activity are taken into account. It is calculated by multiplying your BMR by your Activity Level multiplier.</p>
            </div>
            <div>
                <h4 class="text-[var(--text-primary)] font-semibold mb-3">Body Mass Index (BMI) & Categories</h4>
                <p class="mb-3">BMI is a simple index of weight-for-height that is commonly used to classify underweight, overweight, and obesity in adults. The World Health Organization (WHO) defines the following categories:</p>
                <div class="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-md overflow-hidden text-sm">
                    <div class="grid grid-cols-2 p-3 border-b border-[var(--border)] bg-[var(--bg-secondary)] font-semibold text-[var(--text-primary)]">
                        <div>Category</div>
                        <div>BMI Range</div>
                    </div>
                    <div class="grid grid-cols-2 p-3 border-b border-[var(--border)]">
                        <div class="text-blue-400 font-medium">Underweight</div>
                        <div>Below 18.5</div>
                    </div>
                    <div class="grid grid-cols-2 p-3 border-b border-[var(--border)]">
                        <div class="text-green-500 font-medium">Normal weight</div>
                        <div>18.5 &ndash; 24.9</div>
                    </div>
                    <div class="grid grid-cols-2 p-3 border-b border-[var(--border)]">
                        <div class="text-amber-500 font-medium">Overweight</div>
                        <div>25.0 &ndash; 29.9</div>
                    </div>
                    <div class="grid grid-cols-2 p-3">
                        <div class="text-red-500 font-medium">Obesity</div>
                        <div>30.0 and above</div>
                    </div>
                </div>
            </div>
        </div>
    </ToolSection>

</ToolLayout>

<style>
    .bmr-banner {
        background: var(--bg-tertiary);
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px dashed var(--border);
    }

    /* Tabs Styling */
    .tabs-container {
        display: flex;
        border-bottom: 2px solid var(--border);
        margin-bottom: 1.5rem;
        gap: 0.5rem;
        overflow-x: auto;
    }

    .tab-btn {
        padding: 0.75rem 1.5rem;
        background: transparent;
        color: var(--text-secondary);
        border: none;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
        border-radius: 6px 6px 0 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .tab-btn:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
    }

    .tab-btn.active {
        color: var(--accent);
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-bottom: none;
    }

    .tab-btn.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--bg-secondary); /* Cover border */
    }

    .tab-badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
    }
    .tab-badge.add {
        background: rgba(16, 185, 129, 0.15);
        color: #10b981;
    }

    .macro-desc {
        text-align: center;
        color: var(--text-secondary);
        font-size: 1.05rem;
    }

    /* Macro Cards Styling (Box2 benchmark style) */
    .macro-card {
        background: var(--bg-tertiary); /* Replacing #fdf8e3 cream */
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        transition: box-shadow 0.2s, transform 0.2s;
    }

    .macro-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .macro-header {
        color: #fff;
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        display: inline-block;
        border-radius: 0 0 8px 0;
    }

    .macro-header.moderate { background: #1d4ed8; }
    .macro-header.lower { background: #0369a1; }
    .macro-header.higher { background: #2563eb; }

    .macro-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .macro-row {
        text-align: center;
        display: flex;
        flex-direction: column;
        border-bottom: 1px dotted var(--border);
        padding-bottom: 1.5rem;
    }

    .macro-row.mb-0 {
        border-bottom: none;
        padding-bottom: 0;
    }

    .macro-row .val {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-primary);
        font-family: inherit;
        line-height: 1;
    }

    .macro-row .label {
        font-size: 0.9rem;
        color: var(--text-muted);
        font-style: italic;
        margin-top: 0.25rem;
    }

    /* Food Grid Styling */
    .food-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s;
    }

    .food-card:hover {
        transform: scale(1.02);
        border-color: var(--accent);
    }

    .img-wrapper {
        width: 100%;
        height: 140px;
        overflow: hidden;
        background: var(--bg-tertiary);
    }

    .img-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .food-info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .food-info h5 {
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
    }

    .food-cal {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin-bottom: 0.75rem;
    }

    .food-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-top: auto;
    }

    .food-tags .badge {
        font-size: 0.7rem;
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
        font-weight: 600;
    }

    .badge.p { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .badge.f { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .badge.c { background: rgba(16, 185, 129, 0.15); color: #34d399; }
</style>
